from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from pydantic import BaseModel
from schemas.loan import (
    LoanApplicationCreate, LoanApplicationResponse, LoanApplicationUpdate,
    LoanEvidenceResponse, LoanOfferResponse
)
from db.session import get_db
from crud.loan import (
    create_loan_application, get_user_loan_applications, update_loan_application,
    create_loan_evidence, get_loan_offers_for_user
)
from typing import List
import os
import uuid
from pathlib import Path

router = APIRouter()

class LoanApplicationSubmit(BaseModel):
    user_id: int
    application: LoanApplicationCreate

@router.post("/applications", response_model=LoanApplicationResponse)
def submit_loan_application(
    request: LoanApplicationSubmit,
    db: Session = Depends(get_db)
):
    """Submit new loan application"""
    
    try:
        new_application = create_loan_application(db, request.user_id, request.application)
        return LoanApplicationResponse.from_orm(new_application)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating loan application: {str(e)}"
        )

@router.get("/applications/{user_id}", response_model=List[LoanApplicationResponse])
def get_user_applications(user_id: int, db: Session = Depends(get_db)):
    """Get all loan applications for a user"""
    
    applications = get_user_loan_applications(db, user_id)
    return [LoanApplicationResponse.from_orm(app) for app in applications]

@router.put("/applications/{app_id}", response_model=LoanApplicationResponse)
def update_user_loan_application(
    app_id: int,
    application_update: LoanApplicationUpdate,
    db: Session = Depends(get_db)
):
    """Update loan application (only if pending status)"""
    
    updated_application = update_loan_application(db, app_id, application_update)
    if not updated_application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan application not found"
        )
    
    # Check if application can be updated (only pending applications)
    if updated_application.status not in ["pending", "request_more_info"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update application in current status"
        )
    
    return LoanApplicationResponse.from_orm(updated_application)

@router.post("/evidence/upload", response_model=LoanEvidenceResponse)
async def upload_evidence_document(
    application_id: int = Form(...),
    evidence_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload evidence document for loan application"""
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only JPEG, PNG, and PDF files are allowed."
        )
    
    # Validate file size (max 10MB)
    max_size = 10 * 1024 * 1024  # 10MB
    file_content = await file.read()
    if len(file_content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size too large. Maximum size is 10MB."
        )
    
    # Generate unique filename
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    # Create upload directory if it doesn't exist
    upload_dir = Path("uploads/loan_evidence")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = upload_dir / unique_filename
    with open(file_path, "wb") as buffer:
        buffer.write(file_content)
    
    try:
        # Create evidence record
        from schemas.loan import LoanEvidenceUpload
        evidence_data = LoanEvidenceUpload(
            evidence_type=evidence_type,
            file_name=file.filename,
            file_size=len(file_content),
            mime_type=file.content_type
        )
        
        evidence = create_loan_evidence(db, application_id, evidence_data, str(file_path))
        
        # TODO: Add OCR processing and AI analysis here
        # For now, we'll simulate it
        if file.content_type == "application/pdf":
            evidence.ocr_text = "Sample OCR text from PDF document"
        elif file.content_type.startswith("image/"):
            evidence.ocr_text = "Sample OCR text from image"
        
        evidence.ai_analysis = {
            "document_type": evidence_type,
            "confidence": 0.95,
            "extracted_fields": {
                "amount": None,
                "date": None,
                "vendor": None
            },
            "fraud_indicators": []
        }
        evidence.confidence_score = 0.95
        evidence.verification_status = "verified"
        
        db.commit()
        db.refresh(evidence)
        
        return LoanEvidenceResponse.from_orm(evidence)
        
    except Exception as e:
        # Clean up uploaded file if database operation fails
        if file_path.exists():
            os.remove(file_path)
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing evidence upload: {str(e)}"
        )

@router.get("/loan-offers/{user_id}", response_model=List[LoanOfferResponse])
def get_personalized_loan_offers(user_id: int, db: Session = Depends(get_db)):
    """Get personalized loan offers for user"""
    
    offers = get_loan_offers_for_user(db, user_id)
    
    # If no personalized offers exist, create some based on user's profile
    if not offers:
        from crud.loan import create_loan_offer
        from datetime import datetime, timedelta
        
        # Create standard offers based on green score
        # This would normally be done by ML algorithms
        from models.user import User
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            green_score = getattr(user, 'green_score', 0)
            
            # Standard offer
            standard_offer = {
                "offer_type": "standard",
                "max_amount": 100000.0,
                "min_amount": 10000.0,
                "interest_rate": 18.0,
                "max_term": 24,
                "min_green_score": 0,
                "valid_until": datetime.now() + timedelta(days=30),
                "eligibility_criteria": {
                    "min_business_age": 6,  # months
                    "min_monthly_income": 20000
                }
            }
            
            # Green loan offer (better rates for higher green scores)
            if green_score >= 50:
                green_offer = {
                    "offer_type": "green",
                    "max_amount": 200000.0,
                    "min_amount": 25000.0,
                    "interest_rate": 14.5,
                    "max_term": 36,
                    "min_green_score": 50,
                    "valid_until": datetime.now() + timedelta(days=30),
                    "eligibility_criteria": {
                        "min_green_score": 50,
                        "eco_actions_verified": True
                    }
                }
                offers.append(create_loan_offer(db, user_id, green_offer))
            
            # Premium offer for very high green scores
            if green_score >= 80:
                premium_offer = {
                    "offer_type": "premium",
                    "max_amount": 500000.0,
                    "min_amount": 50000.0,
                    "interest_rate": 12.0,
                    "max_term": 48,
                    "min_green_score": 80,
                    "valid_until": datetime.now() + timedelta(days=60),
                    "eligibility_criteria": {
                        "min_green_score": 80,
                        "business_growth_rate": 10,
                        "previous_loan_performance": "excellent"
                    }
                }
                offers.append(create_loan_offer(db, user_id, premium_offer))
            
            # Always add standard offer
            offers.append(create_loan_offer(db, user_id, standard_offer))
    
    return [LoanOfferResponse.from_orm(offer) for offer in offers]