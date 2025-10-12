from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, ForeignKey, JSON, func
from sqlalchemy.orm import relationship
from db.base import Base
from datetime import datetime

class LoanApplication(Base):
    __tablename__ = "loan_applications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    # Application details
    application_number = Column(String, unique=True, index=True)  # Auto-generated
    business_name = Column(String, nullable=False)
    business_type = Column(String, nullable=False)  # farmer, salon, welding, etc.
    location = Column(String, nullable=False)
    
    # Loan details
    amount_requested = Column(Float, nullable=False)
    loan_purpose = Column(String, nullable=False)
    loan_term = Column(Integer, nullable=False)  # months
    interest_rate = Column(Float, nullable=True)  # Set by bank
    
    # Application status
    status = Column(String, default="pending")  # pending, under_review, approved, rejected, disbursed
    
    # Green/ESG scoring
    green_score = Column(Integer, default=0)
    eco_actions = Column(JSON, nullable=True)  # Array of eco actions
    
    # Risk assessment
    credit_score = Column(Integer, nullable=True)
    fraud_risk_level = Column(String, default="low")  # low, medium, high
    risk_factors = Column(JSON, nullable=True)  # Array of risk factors
    satellite_verification = Column(JSON, nullable=True)  # Satellite data
    
    # Bank review
    assigned_officer_id = Column(Integer, ForeignKey("bank_users.id"), nullable=True)
    review_notes = Column(Text, nullable=True)
    conditions = Column(JSON, nullable=True)  # Loan conditions
    
    # Timestamps
    applied_date = Column(DateTime, default=func.now())
    reviewed_date = Column(DateTime, nullable=True)
    approved_date = Column(DateTime, nullable=True)
    disbursed_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    applicant = relationship("User", back_populates="loan_applications")
    assigned_officer = relationship("BankUser", back_populates="assigned_applications")
    evidence_documents = relationship("LoanEvidence", back_populates="application")
    reviews = relationship("LoanReview", back_populates="application")


class BankUser(Base):
    __tablename__ = "bank_users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    # Profile
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # underwriter, manager, admin
    permissions = Column(JSON, nullable=True)  # Array of permissions
    
    # Bank details
    bank_branch = Column(String, nullable=True)
    employee_id = Column(String, nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    assigned_applications = relationship("LoanApplication", back_populates="assigned_officer")
    reviews = relationship("LoanReview", back_populates="reviewer")


class LoanEvidence(Base):
    __tablename__ = "loan_evidence"
    
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("loan_applications.id"), nullable=False)
    
    # Evidence details
    evidence_type = Column(String, nullable=False)  # receipt, certificate, photo, etc.
    file_path = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String, nullable=True)
    
    # OCR and AI analysis
    ocr_text = Column(Text, nullable=True)
    ai_analysis = Column(JSON, nullable=True)
    verification_status = Column(String, default="pending")  # pending, verified, flagged
    confidence_score = Column(Float, default=0.0)
    
    # Timestamps
    uploaded_at = Column(DateTime, default=func.now())
    verified_at = Column(DateTime, nullable=True)
    
    # Relationships
    application = relationship("LoanApplication", back_populates="evidence_documents")


class LoanReview(Base):
    __tablename__ = "loan_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("loan_applications.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("bank_users.id"), nullable=False)
    
    # Review details
    decision = Column(String, nullable=False)  # approve, reject, request_more_info
    comments = Column(Text, nullable=True)
    recommended_amount = Column(Float, nullable=True)
    recommended_rate = Column(Float, nullable=True)
    conditions = Column(JSON, nullable=True)
    
    # Risk assessment
    risk_rating = Column(String, nullable=True)  # low, medium, high
    risk_notes = Column(Text, nullable=True)
    
    # Timestamps
    reviewed_at = Column(DateTime, default=func.now())
    
    # Relationships
    application = relationship("LoanApplication", back_populates="reviews")
    reviewer = relationship("BankUser", back_populates="reviews")


class LoanOffer(Base):
    __tablename__ = "loan_offers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    # Offer details
    offer_type = Column(String, nullable=False)  # standard, green, premium
    max_amount = Column(Float, nullable=False)
    min_amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    max_term = Column(Integer, nullable=False)  # months
    
    # Eligibility
    min_green_score = Column(Integer, default=0)
    eligibility_criteria = Column(JSON, nullable=True)
    
    # Offer validity
    valid_until = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    user = relationship("User")