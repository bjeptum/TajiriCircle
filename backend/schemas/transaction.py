from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TransactionCreate(BaseModel):
    transaction_type: str  # incoming, outgoing, transfer
    amount: float
    currency: str = "KES"
    description: Optional[str] = None
    reference: Optional[str] = None
    transaction_date: datetime
    counterparty_name: Optional[str] = None
    counterparty_phone: Optional[str] = None
    account_number: Optional[str] = None
    balance_after: Optional[float] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    is_business_related: Optional[bool] = False
    confidence_score: Optional[float] = 1.0

class TransactionResponse(BaseModel):
    id: int
    user_id: int
    transaction_type: str
    amount: float
    currency: str
    description: Optional[str] = None
    reference: Optional[str] = None
    transaction_date: datetime
    counterparty_name: Optional[str] = None
    counterparty_phone: Optional[str] = None
    account_number: Optional[str] = None
    balance_after: Optional[float] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    is_verified: bool
    is_business_related: bool
    confidence_score: float
    created_at: datetime

    class Config:
        from_attributes = True

class SMSParseRequest(BaseModel):
    sms_text: str
    sender: Optional[str] = None
    received_at: Optional[datetime] = None

class SMSParseResponse(BaseModel):
    success: bool
    message: str
    transaction_id: Optional[int] = None
    transaction: Optional[TransactionResponse] = None
    parsed_fields: Optional[dict] = None
    confidence_score: float

class TransactionFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    transaction_type: Optional[str] = None
    category: Optional[str] = None
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None

class TransactionSummary(BaseModel):
    total_incoming: float
    total_outgoing: float
    total_transactions: int
    average_amount: float
    business_transactions: int
    business_percentage: float