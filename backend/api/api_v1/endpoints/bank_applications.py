from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from schemas.loan import (
    LoanApplicationResponse, LoanApplicationListResponse, LoanReviewCreate,
    LoanReviewResponse, ApplicationStatusUpdate, PortfolioMetrics, PortfolioRiskAnalysis
)
from db.session import get_db
from crud.loan import (
    get_loan_applications, get_loan_application_by_id, update_loan_application_status,
    create_loan_review, assign_application_officer, get_portfolio_metrics,
    get_portfolio_risk_analysis
)
from typing import List, Optional

router = APIRouter()

@router.get("/applications", response_model=List[LoanApplicationListResponse])
def get_all_loan_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
    # TODO: Add bank user authentication dependency
):
    """Get all loan applications with optional filtering"""
    
    applications = get_loan_applications(db, skip=skip, limit=limit, status=status)
    
    # Transform to list response format
    response_list = []
    for app in applications:
        response_list.append(LoanApplicationListResponse(
            id=app.id,
            application_number=app.application_number,
            applicant_name=app.applicant.name if app.applicant.name else app.applicant.phone,
            business_name=app.business_name,
            business_type=app.business_type,
            amount_requested=app.amount_requested,
            status=app.status,
            green_score=app.green_score,
            applied_date=app.applied_date,
            assigned_officer=app.assigned_officer.name if app.assigned_officer else None
        ))
    
    return response_list

@router.get("/applications/queue", response_model=List[LoanApplicationListResponse])
def get_applications_queue(db: Session = Depends(get_db)):
    """Get applications queue for review (pending and under_review)"""
    
    pending_apps = get_loan_applications(db, status="pending")
    under_review_apps = get_loan_applications(db, status="under_review")
    
    all_queue_apps = pending_apps + under_review_apps
    
    # Sort by priority (green_score desc, applied_date asc)
    all_queue_apps.sort(key=lambda x: (-x.green_score, x.applied_date))
    
    response_list = []
    for app in all_queue_apps:
        response_list.append(LoanApplicationListResponse(
            id=app.id,
            application_number=app.application_number,
            applicant_name=app.applicant.name if app.applicant.name else app.applicant.phone,
            business_name=app.business_name,
            business_type=app.business_type,
            amount_requested=app.amount_requested,
            status=app.status,
            green_score=app.green_score,
            applied_date=app.applied_date,
            assigned_officer=app.assigned_officer.name if app.assigned_officer else None
        ))
    
    return response_list

@router.get("/applications/{app_id}", response_model=LoanApplicationResponse)
def get_loan_application_details(app_id: int, db: Session = Depends(get_db)):
    """Get specific loan application details"""
    
    application = get_loan_application_by_id(db, app_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan application not found"
        )
    
    return LoanApplicationResponse.from_orm(application)

@router.put("/applications/{app_id}/status")
def update_application_status(
    app_id: int,
    status_update: ApplicationStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update loan application status"""
    
    application = update_loan_application_status(
        db, 
        app_id, 
        status_update.status,
        status_update.notes,
        status_update.interest_rate,
        status_update.conditions
    )
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan application not found"
        )
    
    return {
        "success": True,
        "message": f"Application status updated to {status_update.status}",
        "application_id": app_id,
        "new_status": status_update.status
    }

@router.post("/applications/{app_id}/review", response_model=LoanReviewResponse)
def submit_loan_review(
    app_id: int,
    review_data: LoanReviewCreate,
    reviewer_id: int = Query(..., description="Bank user ID of reviewer"),
    db: Session = Depends(get_db)
):
    """Submit loan application review decision"""
    
    # Verify application exists
    application = get_loan_application_by_id(db, app_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan application not found"
        )
    
    # Create review
    review = create_loan_review(db, app_id, reviewer_id, review_data)
    
    # Format response
    return LoanReviewResponse(
        id=review.id,
        application_id=review.application_id,
        reviewer_id=review.reviewer_id,
        reviewer_name=review.reviewer.name,
        decision=review.decision,
        comments=review.comments,
        recommended_amount=review.recommended_amount,
        recommended_rate=review.recommended_rate,
        conditions=review.conditions,
        risk_rating=review.risk_rating,
        risk_notes=review.risk_notes,
        reviewed_at=review.reviewed_at
    )

@router.put("/applications/{app_id}/assign/{officer_id}")
def assign_loan_officer(
    app_id: int,
    officer_id: int,
    db: Session = Depends(get_db)
):
    """Assign loan application to bank officer"""
    
    application = assign_application_officer(db, app_id, officer_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan application not found"
        )
    
    return {
        "success": True,
        "message": "Application assigned successfully",
        "application_id": app_id,
        "assigned_officer_id": officer_id
    }

@router.get("/portfolio", response_model=PortfolioMetrics)
def get_portfolio_overview(db: Session = Depends(get_db)):
    """Get portfolio overview metrics"""
    
    metrics = get_portfolio_metrics(db)
    return PortfolioMetrics(**metrics)

@router.get("/portfolio/metrics", response_model=PortfolioMetrics)
def get_detailed_portfolio_metrics(db: Session = Depends(get_db)):
    """Get detailed portfolio performance metrics"""
    
    metrics = get_portfolio_metrics(db)
    return PortfolioMetrics(**metrics)

@router.get("/portfolio/risk-analysis", response_model=PortfolioRiskAnalysis)
def get_portfolio_risk_analysis(db: Session = Depends(get_db)):
    """Get portfolio risk analysis data"""
    
    risk_analysis = get_portfolio_risk_analysis(db)
    return PortfolioRiskAnalysis(**risk_analysis)