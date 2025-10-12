from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, func
from sqlalchemy.orm import relationship
from db.base import Base
from datetime import datetime

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    business_name = Column(String, nullable=True)
    business_type = Column(String, nullable=True)  # farmer, salon, welding, etc.
    location = Column(String, nullable=True)
    green_score = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    otp_code = Column(String, nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    transactions = relationship("Transaction", back_populates="user")
    loan_applications = relationship("LoanApplication", back_populates="applicant")