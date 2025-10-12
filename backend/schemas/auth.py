from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    phone: str
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel):
    phone: str
    password: str

class OTPRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str

class UserProfile(BaseModel):
    id: int
    phone: str
    name: Optional[str] = None
    email: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    location: Optional[str] = None
    green_score: int = 0
    created_at: Optional[datetime] = None
    is_verified: bool = False

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    location: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    phone: str
    name: Optional[str] = None
    is_verified: bool = False

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"

class OTPResponse(BaseModel):
    success: bool
    message: str
    user: Optional[UserResponse] = None