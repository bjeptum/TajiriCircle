from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.auth import (
    UserCreate, UserResponse, UserLogin, OTPRequest, OTPVerify,
    LoginResponse, OTPResponse, UserProfile, UserProfileUpdate
)
from db.session import get_db
from crud.auth import (
    create_user, get_user_by_phone, authenticate_user, create_otp, 
    verify_otp, get_user_by_id, update_user_profile
)
from datetime import datetime, timedelta
import hashlib
import secrets

# Simple token settings - use proper JWT library in production
TOKEN_SECRET = "your-secret-key"  # Use environment variable in production

router = APIRouter()

def create_access_token(data: dict):
    """Create simple access token (use JWT in production)"""
    # Simple token for demo - use proper JWT in production
    user_id = data.get("sub", "")
    phone = data.get("phone", "")
    timestamp = str(int(datetime.utcnow().timestamp()))
    token_data = f"{user_id}:{phone}:{timestamp}"
    
    # Create a hash-based token
    token_hash = hashlib.sha256(f"{token_data}:{TOKEN_SECRET}".encode()).hexdigest()
    return f"{user_id}.{token_hash[:32]}"

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    existing_user = get_user_by_phone(db, phone=user.phone)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Phone number already registered"
        )
    
    new_user = create_user(db, user=user)
    return UserResponse.from_orm(new_user)

@router.post("/login", response_model=LoginResponse)
def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user with phone and password"""
    user = authenticate_user(db, user_credentials.phone, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id), "phone": user.phone})
    
    return LoginResponse(
        user=UserResponse.from_orm(user),
        access_token=access_token,
        token_type="bearer"
    )

@router.post("/send-otp", response_model=OTPResponse)
def send_otp(otp_request: OTPRequest, db: Session = Depends(get_db)):
    """Send OTP to user's phone"""
    success, message = create_otp(db, otp_request.phone)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=message
        )
    
    # In production, send SMS here
    # For demo purposes, we return the OTP (don't do this in production!)
    return OTPResponse(
        success=True,
        message=f"OTP sent successfully. For demo: {message}"
    )

@router.post("/verify-otp", response_model=OTPResponse)
def verify_otp_endpoint(otp_verify: OTPVerify, db: Session = Depends(get_db)):
    """Verify OTP code"""
    success, result = verify_otp(db, otp_verify.phone, otp_verify.otp)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result
        )
    
    return OTPResponse(
        success=True,
        message="OTP verified successfully",
        user=UserResponse.from_orm(result)
    )

@router.get("/users/{user_id}/profile", response_model=UserProfile)
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """Get user profile"""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserProfile.from_orm(user)

@router.put("/users/{user_id}/profile", response_model=UserProfile)
def update_user_profile_endpoint(
    user_id: int, 
    profile_data: UserProfileUpdate, 
    db: Session = Depends(get_db)
):
    """Update user profile"""
    updated_user = update_user_profile(db, user_id, profile_data)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserProfile.from_orm(updated_user)