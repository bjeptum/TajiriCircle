from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.dashboard import DashboardData, DashboardAnalytics
from schemas.transaction import TransactionResponse
from db.session import get_db
from crud.dashboard import get_dashboard_data, get_dashboard_analytics
from crud.transaction import get_user_transactions
from typing import List

router = APIRouter()

@router.get("/{user_id}", response_model=DashboardData)
def get_user_dashboard(user_id: int, db: Session = Depends(get_db)):
    """Get comprehensive dashboard data for user"""
    try:
        dashboard_data = get_dashboard_data(db, user_id)
        return dashboard_data
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching dashboard data: {str(e)}"
        )

@router.get("/{user_id}/analytics", response_model=DashboardAnalytics)
def get_user_analytics(user_id: int, db: Session = Depends(get_db)):
    """Get detailed analytics for user dashboard"""
    try:
        analytics_data = get_dashboard_analytics(db, user_id)
        return analytics_data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching analytics data: {str(e)}"
        )

@router.get("/{user_id}/transactions", response_model=List[TransactionResponse])
def get_dashboard_transactions(user_id: int, db: Session = Depends(get_db)):
    """Get recent transactions for dashboard"""
    try:
        # Get last 20 transactions for dashboard
        transactions = get_user_transactions(db, user_id, None, limit=20, offset=0)
        return [TransactionResponse.from_orm(txn) for txn in transactions]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching dashboard transactions: {str(e)}"
        )