from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class ChamaStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class MemberRole(str, Enum):
    ADMIN = "admin"
    TREASURER = "treasurer"
    SECRETARY = "secretary"
    MEMBER = "member"

class ContributionStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    OVERDUE = "overdue"

# Base schemas
class ChamaCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = None
    monthly_contribution: float = Field(..., gt=0)
    meeting_day: Optional[str] = None

class ChamaUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    monthly_contribution: Optional[float] = None
    meeting_day: Optional[str] = None
    status: Optional[ChamaStatus] = None

class ChamaMemberCreate(BaseModel):
    user_phone: str = Field(..., description="Phone number of user to add")
    role: MemberRole = MemberRole.MEMBER

class ContributionCreate(BaseModel):
    amount: float = Field(..., gt=0)
    contribution_month: str = Field(..., description="Format: YYYY-MM")

# Response schemas
class ChamaMemberResponse(BaseModel):
    id: int
    user_id: int
    role: MemberRole
    joined_at: datetime
    is_active: bool
    total_contributions: float
    # User details (we'll add this via join)
    user_phone: Optional[str] = None
    user_name: Optional[str] = None

    model_config = {"from_attributes": True}

class ChamaContributionResponse(BaseModel):
    id: int
    member_id: int
    amount: float
    contribution_month: str
    status: ContributionStatus
    paid_at: Optional[datetime] = None
    created_at: datetime
    # Member details
    member_phone: Optional[str] = None
    member_role: Optional[MemberRole] = None

    model_config = {"from_attributes": True}

class ChamaResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    total_members: int
    monthly_contribution: float
    meeting_day: Optional[str] = None
    total_savings: float
    created_by: int
    status: ChamaStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    # Related data
    members: List[ChamaMemberResponse] = []
    recent_contributions: List[ChamaContributionResponse] = []
    
    # Creator info
    creator_phone: Optional[str] = None

    model_config = {"from_attributes": True}

class ChamaListResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    total_members: int
    monthly_contribution: float
    total_savings: float
    status: ChamaStatus
    created_at: datetime
    # User's role in this chama
    user_role: Optional[MemberRole] = None
    # Contribution status for current month
    current_month_status: Optional[ContributionStatus] = None

    model_config = {"from_attributes": True}

# Dashboard summary
class ChamaSummary(BaseModel):
    total_chamas: int
    total_savings: float
    monthly_contributions_due: float
    pending_contributions: int
    active_memberships: int