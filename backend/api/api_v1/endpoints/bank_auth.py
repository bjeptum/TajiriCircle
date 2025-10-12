from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.loan import BankUserCreate, BankUserLogin, BankLoginResponse, BankUserResponse
from db.session import get_db
from crud.loan import create_bank_user, authenticate_bank_user, get_bank_user_by_id
import hashlib
from datetime import datetime

router = APIRouter()

def create_access_token(data: dict):
    """Create simple access token for bank users"""
    user_id = data.get("sub", "")
    email = data.get("email", "")
    role = data.get("role", "")
    timestamp = str(int(datetime.utcnow().timestamp()))
    token_data = f"{user_id}:{email}:{role}:{timestamp}"
    
    # Create a hash-based token
    token_hash = hashlib.sha256(f"{token_data}:bank_secret".encode()).hexdigest()
    return f"bank_{user_id}.{token_hash[:32]}"

@router.post("/login", response_model=BankLoginResponse)
def bank_user_login(credentials: BankUserLogin, db: Session = Depends(get_db)):
    """Bank staff login"""
    user = authenticate_bank_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email, "role": user.role})
    
    return BankLoginResponse(
        user=BankUserResponse.from_orm(user),
        access_token=access_token,
        token_type="bearer"
    )

@router.post("/register", response_model=BankUserResponse)
def create_bank_staff(user_data: BankUserCreate, db: Session = Depends(get_db)):
    """Create new bank staff user (admin only)"""
    # In production, add proper authorization check here
    new_user = create_bank_user(db, user_data)
    return BankUserResponse.from_orm(new_user)

@router.get("/profile/{user_id}", response_model=BankUserResponse)
def get_bank_user_profile(user_id: int, db: Session = Depends(get_db)):
    """Get bank user profile"""
    user = get_bank_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bank user not found"
        )
    
    return BankUserResponse.from_orm(user)