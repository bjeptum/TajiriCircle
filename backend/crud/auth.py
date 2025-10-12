from sqlalchemy.orm import Session
from models.user import User
from schemas.auth import UserCreate, UserProfileUpdate
from datetime import datetime, timedelta
import hashlib
import random
import string

def hash_password(password: str) -> str:
    """Simple password hashing - use bcrypt in production"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password"""
    return hash_password(plain_password) == hashed_password

def generate_otp() -> str:
    """Generate 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def get_user_by_phone(db: Session, phone: str):
    return db.query(User).filter(User.phone == phone).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate):
    hashed_pw = hash_password(user.password)
    db_user = User(
        phone=user.phone, 
        hashed_password=hashed_pw,
        name=user.name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, phone: str, password: str):
    user = get_user_by_phone(db, phone)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_otp(db: Session, phone: str) -> tuple[bool, str]:
    """Create OTP for user"""
    user = get_user_by_phone(db, phone)
    if not user:
        return False, "User not found"
    
    otp = generate_otp()
    expires_at = datetime.now() + timedelta(minutes=5)  # OTP valid for 5 minutes
    
    user.otp_code = otp
    user.otp_expires_at = expires_at
    db.commit()
    
    # In production, send SMS here
    return True, otp

def verify_otp(db: Session, phone: str, otp: str):
    """Verify OTP and mark user as verified"""
    user = get_user_by_phone(db, phone)
    if not user:
        return False, "User not found"
    
    if not user.otp_code or user.otp_code != otp:
        return False, "Invalid OTP"
    
    if user.otp_expires_at and user.otp_expires_at < datetime.now():
        return False, "OTP expired"
    
    # Mark as verified and clear OTP
    user.is_verified = True
    user.otp_code = None
    user.otp_expires_at = None
    db.commit()
    
    return True, user

def update_user_profile(db: Session, user_id: int, profile_data: UserProfileUpdate):
    """Update user profile"""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    
    update_data = profile_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user