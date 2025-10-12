from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from schemas.transaction import (
    TransactionCreate, TransactionResponse, SMSParseRequest, SMSParseResponse,
    TransactionFilter, TransactionSummary
)
from db.session import get_db
from crud.transaction import (
    create_transaction, get_user_transactions, parse_sms_transaction,
    get_transaction_summary
)
from typing import List, Optional
from datetime import datetime

router = APIRouter()

@router.post("/sms/parse", response_model=SMSParseResponse)
def parse_sms(
    sms_data: SMSParseRequest,
    user_id: int = Query(..., description="User ID"),
    db: Session = Depends(get_db)
):
    """Parse SMS for transaction data"""
    try:
        result = parse_sms_transaction(db, user_id, sms_data)
        
        return SMSParseResponse(
            success=result["success"],
            message=result["message"],
            transaction_id=result["transaction"].id if result.get("transaction") else None,
            transaction=result.get("transaction"),
            confidence_score=result["confidence_score"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing SMS: {str(e)}"
        )

@router.get("/transactions/{user_id}", response_model=List[TransactionResponse])
def get_transactions(
    user_id: int,
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    transaction_type: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_amount: Optional[float] = Query(None),
    max_amount: Optional[float] = Query(None),
    limit: int = Query(100, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """Get user transactions with optional filtering"""
    
    filter_params = TransactionFilter(
        start_date=start_date,
        end_date=end_date,
        transaction_type=transaction_type,
        category=category,
        min_amount=min_amount,
        max_amount=max_amount
    )
    
    transactions = get_user_transactions(db, user_id, filter_params, limit, offset)
    return [TransactionResponse.from_orm(txn) for txn in transactions]

@router.post("/transactions", response_model=TransactionResponse)
def create_new_transaction(
    transaction: TransactionCreate,
    user_id: int = Query(..., description="User ID"),
    db: Session = Depends(get_db)
):
    """Create a new transaction"""
    try:
        new_transaction = create_transaction(db, user_id, transaction)
        return TransactionResponse.from_orm(new_transaction)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating transaction: {str(e)}"
        )

@router.get("/transactions/{user_id}/summary", response_model=TransactionSummary)
def get_user_transaction_summary(
    user_id: int,
    days: int = Query(30, description="Number of days to include in summary"),
    db: Session = Depends(get_db)
):
    """Get transaction summary for user"""
    try:
        summary_data = get_transaction_summary(db, user_id, days)
        return TransactionSummary(**summary_data)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting transaction summary: {str(e)}"
        )