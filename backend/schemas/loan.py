from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# Bank User Schemas
class BankUserCreate(BaseModel):
    email: str
    password: str
    name: str
    role: str  # underwriter, manager, admin
    permissions: Optional[List[str]] = None
    bank_branch: Optional[str] = None
    employee_id: Optional[str] = None

class BankUserLogin(BaseModel):
    email: str
    password: str

class BankUserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    permissions: Optional[List[str]] = None
    bank_branch: Optional[str] = None
    employee_id: Optional[str] = None
    is_active: bool
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class BankLoginResponse(BaseModel):
    user: BankUserResponse
    access_token: str
    token_type: str = "bearer"

# Loan Application Schemas
class LoanApplicationCreate(BaseModel):
    business_name: str
    business_type: str
    location: str
    amount_requested: float
    loan_purpose: str
    loan_term: int  # months
    eco_actions: Optional[List[Dict[str, Any]]] = None

class LoanApplicationUpdate(BaseModel):
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    location: Optional[str] = None
    amount_requested: Optional[float] = None
    loan_purpose: Optional[str] = None
    loan_term: Optional[int] = None
    eco_actions: Optional[List[Dict[str, Any]]] = None

class LoanApplicationResponse(BaseModel):
    id: int
    user_id: int
    application_number: str
    business_name: str
    business_type: str
    location: str
    amount_requested: float
    loan_purpose: str
    loan_term: int
    interest_rate: Optional[float] = None
    status: str
    green_score: int
    eco_actions: Optional[List[Dict[str, Any]]] = None
    credit_score: Optional[int] = None
    fraud_risk_level: str
    risk_factors: Optional[List[str]] = None
    satellite_verification: Optional[Dict[str, Any]] = None
    assigned_officer_id: Optional[int] = None
    review_notes: Optional[str] = None
    conditions: Optional[List[str]] = None
    applied_date: datetime
    reviewed_date: Optional[datetime] = None
    approved_date: Optional[datetime] = None
    disbursed_date: Optional[datetime] = None

    class Config:
        from_attributes = True

class LoanApplicationListResponse(BaseModel):
    id: int
    application_number: str
    applicant_name: str
    business_name: str
    business_type: str
    amount_requested: float
    status: str
    green_score: int
    applied_date: datetime
    assigned_officer: Optional[str] = None

# Loan Review Schemas
class LoanReviewCreate(BaseModel):
    decision: str  # approve, reject, request_more_info
    comments: Optional[str] = None
    recommended_amount: Optional[float] = None
    recommended_rate: Optional[float] = None
    conditions: Optional[List[str]] = None
    risk_rating: Optional[str] = None
    risk_notes: Optional[str] = None

class LoanReviewResponse(BaseModel):
    id: int
    application_id: int
    reviewer_id: int
    reviewer_name: str
    decision: str
    comments: Optional[str] = None
    recommended_amount: Optional[float] = None
    recommended_rate: Optional[float] = None
    conditions: Optional[List[str]] = None
    risk_rating: Optional[str] = None
    risk_notes: Optional[str] = None
    reviewed_at: datetime

    class Config:
        from_attributes = True

# Evidence Schemas
class LoanEvidenceUpload(BaseModel):
    evidence_type: str
    file_name: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None

class LoanEvidenceResponse(BaseModel):
    id: int
    application_id: int
    evidence_type: str
    file_name: str
    file_path: str
    ocr_text: Optional[str] = None
    ai_analysis: Optional[Dict[str, Any]] = None
    verification_status: str
    confidence_score: float
    uploaded_at: datetime
    verified_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Loan Offer Schemas
class LoanOfferResponse(BaseModel):
    id: int
    offer_type: str
    max_amount: float
    min_amount: float
    interest_rate: float
    max_term: int
    min_green_score: int
    eligibility_criteria: Optional[Dict[str, Any]] = None
    valid_until: datetime
    is_active: bool

    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioMetrics(BaseModel):
    total_applications: int
    pending_applications: int
    approved_applications: int
    rejected_applications: int
    total_loan_amount: float
    average_loan_size: float
    average_green_score: float
    approval_rate: float
    default_rate: float

class PortfolioRiskAnalysis(BaseModel):
    risk_distribution: Dict[str, int]  # low, medium, high counts
    sector_concentration: Dict[str, float]  # business_type percentages
    geographic_spread: Dict[str, int]  # location counts
    green_score_distribution: List[Dict[str, Any]]
    fraud_alerts: int
    recommendations: List[str]

class ApplicationStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None
    interest_rate: Optional[float] = None
    conditions: Optional[List[str]] = None