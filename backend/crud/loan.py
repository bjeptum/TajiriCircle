from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_, func, desc
from models.loan import LoanApplication, BankUser, LoanEvidence, LoanReview, LoanOffer
from models.user import User
from schemas.loan import (
    LoanApplicationCreate, LoanApplicationUpdate, LoanReviewCreate, 
    LoanEvidenceUpload, BankUserCreate, BankUserLogin
)
from crud.auth import hash_password, verify_password
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import secrets
import string

def generate_application_number() -> str:
    """Generate unique application number"""
    prefix = "APP"
    suffix = ''.join([secrets.choice(string.digits) for _ in range(6)])
    return f"{prefix}{suffix}"

# Bank User CRUD
def create_bank_user(db: Session, user_data: BankUserCreate):
    """Create a new bank user"""
    hashed_pw = hash_password(user_data.password)
    db_user = BankUser(
        email=user_data.email,
        hashed_password=hashed_pw,
        name=user_data.name,
        role=user_data.role,
        permissions=user_data.permissions,
        bank_branch=user_data.bank_branch,
        employee_id=user_data.employee_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_bank_user(db: Session, email: str, password: str):
    """Authenticate bank user"""
    user = db.query(BankUser).filter(BankUser.email == email, BankUser.is_active == True).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    
    # Update last login
    user.last_login = datetime.now()
    db.commit()
    return user

def get_bank_user_by_id(db: Session, user_id: int):
    """Get bank user by ID"""
    return db.query(BankUser).filter(BankUser.id == user_id, BankUser.is_active == True).first()

# Loan Application CRUD
def create_loan_application(db: Session, user_id: int, application_data: LoanApplicationCreate):
    """Create a new loan application"""
    
    # Calculate green score based on eco actions
    green_score = calculate_green_score(application_data.eco_actions or [])
    
    db_application = LoanApplication(
        user_id=user_id,
        application_number=generate_application_number(),
        business_name=application_data.business_name,
        business_type=application_data.business_type,
        location=application_data.location,
        amount_requested=application_data.amount_requested,
        loan_purpose=application_data.loan_purpose,
        loan_term=application_data.loan_term,
        eco_actions=application_data.eco_actions,
        green_score=green_score
    )
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def get_loan_applications(db: Session, skip: int = 0, limit: int = 100, status: Optional[str] = None):
    """Get loan applications with optional status filter"""
    query = db.query(LoanApplication).options(
        joinedload(LoanApplication.applicant),
        joinedload(LoanApplication.assigned_officer)
    )
    
    if status:
        query = query.filter(LoanApplication.status == status)
    
    return query.order_by(desc(LoanApplication.applied_date)).offset(skip).limit(limit).all()

def get_loan_application_by_id(db: Session, application_id: int):
    """Get loan application by ID with related data"""
    return db.query(LoanApplication).options(
        joinedload(LoanApplication.applicant),
        joinedload(LoanApplication.assigned_officer),
        joinedload(LoanApplication.evidence_documents),
        joinedload(LoanApplication.reviews)
    ).filter(LoanApplication.id == application_id).first()

def get_user_loan_applications(db: Session, user_id: int):
    """Get all loan applications for a user"""
    return db.query(LoanApplication).filter(
        LoanApplication.user_id == user_id
    ).order_by(desc(LoanApplication.applied_date)).all()

def update_loan_application_status(db: Session, application_id: int, status: str, notes: Optional[str] = None, 
                                 interest_rate: Optional[float] = None, conditions: Optional[List[str]] = None):
    """Update loan application status"""
    application = db.query(LoanApplication).filter(LoanApplication.id == application_id).first()
    if not application:
        return None
    
    application.status = status
    if notes:
        application.review_notes = notes
    if interest_rate:
        application.interest_rate = interest_rate
    if conditions:
        application.conditions = conditions
    
    # Update timestamps based on status
    if status == "under_review":
        application.reviewed_date = datetime.now()
    elif status == "approved":
        application.approved_date = datetime.now()
    elif status == "disbursed":
        application.disbursed_date = datetime.now()
    
    db.commit()
    db.refresh(application)
    return application

def update_loan_application(db: Session, application_id: int, application_data: LoanApplicationUpdate):
    """Update loan application details"""
    application = db.query(LoanApplication).filter(LoanApplication.id == application_id).first()
    if not application:
        return None
    
    update_data = application_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(application, field, value)
    
    # Recalculate green score if eco_actions updated
    if 'eco_actions' in update_data:
        application.green_score = calculate_green_score(application.eco_actions or [])
    
    db.commit()
    db.refresh(application)
    return application

def assign_application_officer(db: Session, application_id: int, officer_id: int):
    """Assign application to bank officer"""
    application = db.query(LoanApplication).filter(LoanApplication.id == application_id).first()
    if not application:
        return None
    
    application.assigned_officer_id = officer_id
    db.commit()
    db.refresh(application)
    return application

# Loan Review CRUD
def create_loan_review(db: Session, application_id: int, reviewer_id: int, review_data: LoanReviewCreate):
    """Create loan review"""
    db_review = LoanReview(
        application_id=application_id,
        reviewer_id=reviewer_id,
        decision=review_data.decision,
        comments=review_data.comments,
        recommended_amount=review_data.recommended_amount,
        recommended_rate=review_data.recommended_rate,
        conditions=review_data.conditions,
        risk_rating=review_data.risk_rating,
        risk_notes=review_data.risk_notes
    )
    
    db.add(db_review)
    
    # Update application status based on decision
    application = db.query(LoanApplication).filter(LoanApplication.id == application_id).first()
    if application:
        if review_data.decision == "approve":
            application.status = "approved"
            application.approved_date = datetime.now()
            if review_data.recommended_amount:
                application.amount_requested = review_data.recommended_amount
            if review_data.recommended_rate:
                application.interest_rate = review_data.recommended_rate
        elif review_data.decision == "reject":
            application.status = "rejected"
        elif review_data.decision == "request_more_info":
            application.status = "pending"
        
        application.review_notes = review_data.comments
        application.conditions = review_data.conditions
        application.reviewed_date = datetime.now()
    
    db.commit()
    db.refresh(db_review)
    return db_review

# Evidence CRUD
def create_loan_evidence(db: Session, application_id: int, evidence_data: LoanEvidenceUpload, file_path: str):
    """Create loan evidence record"""
    db_evidence = LoanEvidence(
        application_id=application_id,
        evidence_type=evidence_data.evidence_type,
        file_name=evidence_data.file_name,
        file_path=file_path,
        file_size=evidence_data.file_size,
        mime_type=evidence_data.mime_type
    )
    
    db.add(db_evidence)
    db.commit()
    db.refresh(db_evidence)
    return db_evidence

# Loan Offers CRUD
def get_loan_offers_for_user(db: Session, user_id: int):
    """Get personalized loan offers for user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return []
    
    # Get active offers that user qualifies for
    offers = db.query(LoanOffer).filter(
        and_(
            LoanOffer.is_active == True,
            LoanOffer.valid_until > datetime.now(),
            LoanOffer.min_green_score <= user.green_score
        )
    ).all()
    
    return offers

def create_loan_offer(db: Session, user_id: int, offer_data: dict):
    """Create personalized loan offer"""
    db_offer = LoanOffer(
        user_id=user_id,
        **offer_data
    )
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer

# Portfolio Analytics
def get_portfolio_metrics(db: Session) -> Dict[str, Any]:
    """Get portfolio performance metrics"""
    
    # Basic counts
    total_applications = db.query(LoanApplication).count()
    pending_applications = db.query(LoanApplication).filter(LoanApplication.status == "pending").count()
    approved_applications = db.query(LoanApplication).filter(LoanApplication.status == "approved").count()
    rejected_applications = db.query(LoanApplication).filter(LoanApplication.status == "rejected").count()
    
    # Financial metrics
    approved_loans = db.query(LoanApplication).filter(LoanApplication.status == "approved").all()
    total_loan_amount = sum(app.amount_requested for app in approved_loans)
    average_loan_size = total_loan_amount / len(approved_loans) if approved_loans else 0
    
    # Green score metrics
    all_applications = db.query(LoanApplication).all()
    average_green_score = sum(app.green_score for app in all_applications) / len(all_applications) if all_applications else 0
    
    # Approval rate
    approval_rate = (approved_applications / total_applications * 100) if total_applications > 0 else 0
    
    return {
        "total_applications": total_applications,
        "pending_applications": pending_applications,
        "approved_applications": approved_applications,
        "rejected_applications": rejected_applications,
        "total_loan_amount": total_loan_amount,
        "average_loan_size": average_loan_size,
        "average_green_score": average_green_score,
        "approval_rate": approval_rate,
        "default_rate": 2.3  # Mock data - implement based on actual defaults
    }

def get_portfolio_risk_analysis(db: Session) -> Dict[str, Any]:
    """Get portfolio risk analysis"""
    applications = db.query(LoanApplication).all()
    
    # Risk distribution
    risk_distribution = {"low": 0, "medium": 0, "high": 0}
    for app in applications:
        risk_distribution[app.fraud_risk_level] += 1
    
    # Sector concentration
    sector_counts = {}
    for app in applications:
        sector_counts[app.business_type] = sector_counts.get(app.business_type, 0) + 1
    
    total_apps = len(applications)
    sector_concentration = {k: (v/total_apps*100) if total_apps > 0 else 0 
                          for k, v in sector_counts.items()}
    
    # Geographic spread
    location_counts = {}
    for app in applications:
        location_counts[app.location] = location_counts.get(app.location, 0) + 1
    
    # Green score distribution
    green_score_ranges = {"0-30": 0, "31-60": 0, "61-80": 0, "81-100": 0}
    for app in applications:
        score = app.green_score
        if score <= 30:
            green_score_ranges["0-30"] += 1
        elif score <= 60:
            green_score_ranges["31-60"] += 1
        elif score <= 80:
            green_score_ranges["61-80"] += 1
        else:
            green_score_ranges["81-100"] += 1
    
    green_score_distribution = [
        {"range": k, "count": v, "percentage": (v/total_apps*100) if total_apps > 0 else 0}
        for k, v in green_score_ranges.items()
    ]
    
    return {
        "risk_distribution": risk_distribution,
        "sector_concentration": sector_concentration,
        "geographic_spread": location_counts,
        "green_score_distribution": green_score_distribution,
        "fraud_alerts": 3,  # Mock data
        "recommendations": [
            "Consider diversifying sector exposure",
            "Monitor high-risk applications closely",
            "Increase green lending incentives"
        ]
    }

def calculate_green_score(eco_actions: List[Dict[str, Any]]) -> int:
    """Calculate green score based on eco actions"""
    if not eco_actions:
        return 0
    
    score = 0
    for action in eco_actions:
        action_type = action.get("type", "").lower()
        verified = action.get("verified", False)
        
        # Base scores for different action types
        base_scores = {
            "solar": 25,
            "led": 15,
            "water_saving": 20,
            "recycling": 10,
            "organic": 18,
            "energy_efficient": 22
        }
        
        # Find matching action type
        for key, base_score in base_scores.items():
            if key in action_type:
                points = base_score
                if verified:
                    points = int(points * 1.5)  # 50% bonus for verified actions
                score += points
                break
    
    return min(score, 100)  # Cap at 100