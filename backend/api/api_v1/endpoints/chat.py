from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db

router = APIRouter()

@router.post("/")
def chat_with_ai(db: Session = Depends(get_db)):
    # Placeholder for AI chat endpoint
    return {"message": "Chat response"}