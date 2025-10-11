from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.auth import UserCreate, UserResponse
from db.session import get_db
from crud.auth import create_user, get_user_by_phone

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_phone(db, phone=user.phone)
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    return create_user(db, user=user)