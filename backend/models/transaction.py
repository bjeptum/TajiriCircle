from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float, ForeignKey, func
from sqlalchemy.orm import relationship
from db.base import Base
from datetime import datetime

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    # Transaction details
    transaction_type = Column(String)  # incoming, outgoing, transfer
    amount = Column(Float, nullable=False)
    currency = Column(String, default="KES")
    
    # Transaction metadata
    description = Column(Text, nullable=True)
    reference = Column(String, nullable=True)
    transaction_date = Column(DateTime, nullable=False)
    
    # SMS parsing details
    raw_sms = Column(Text, nullable=True)  # Original SMS text
    sender = Column(String, nullable=True)  # SMS sender (e.g., M-PESA)
    parsed_data = Column(Text, nullable=True)  # JSON of parsed fields
    
    # Transaction party details
    counterparty_name = Column(String, nullable=True)
    counterparty_phone = Column(String, nullable=True)
    
    # Account/Wallet details
    account_number = Column(String, nullable=True)
    balance_after = Column(Float, nullable=True)
    
    # Categories and classification
    category = Column(String, nullable=True)  # business, personal, chama, etc.
    subcategory = Column(String, nullable=True)  # specific business type
    
    # Flags and status
    is_verified = Column(Boolean, default=False)
    is_business_related = Column(Boolean, default=False)
    confidence_score = Column(Float, default=1.0)  # AI parsing confidence
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="transactions")


class SMSParsingLog(Base):
    __tablename__ = "sms_parsing_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    
    raw_sms = Column(Text, nullable=False)
    sender = Column(String, nullable=True)
    parsing_status = Column(String, default="pending")  # success, failed, partial
    error_message = Column(Text, nullable=True)
    parsed_fields = Column(Text, nullable=True)  # JSON
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=True)
    
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    user = relationship("User")
    transaction = relationship("Transaction")