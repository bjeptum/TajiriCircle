from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db

router = APIRouter()

@router.get("/{user_id}")
def get_fraud_alerts(user_id: int, db: Session = Depends(get_db)):
    # Placeholder for fetching fraud alerts
    return {"user_id": user_id, "alerts": []}