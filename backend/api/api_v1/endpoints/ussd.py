from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db

router = APIRouter()

@router.post("/")
def handle_ussd_request(db: Session = Depends(get_db)):
    # Placeholder for handling USSD requests
    return {"message": "USSD request handled"}