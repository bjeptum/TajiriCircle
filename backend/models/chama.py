from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db.base import Base
import enum

class ChamaStatus(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class MemberRole(enum.Enum):
    ADMIN = "admin"
    TREASURER = "treasurer"
    SECRETARY = "secretary"
    MEMBER = "member"

class ContributionStatus(enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    OVERDUE = "overdue"

class Chama(Base):
    __tablename__ = "chamas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    total_members = Column(Integer, default=1)
    monthly_contribution = Column(Float, nullable=False)
    meeting_day = Column(String)  # e.g., "first_monday", "every_friday"
    total_savings = Column(Float, default=0.0)
    created_by = Column(Integer, ForeignKey("user.id"))
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    creator = relationship("User", foreign_keys=[created_by])
    members = relationship("ChamaMember", back_populates="chama")
    contributions = relationship("ChamaContribution", back_populates="chama")

class ChamaMember(Base):
    __tablename__ = "chama_members"

    id = Column(Integer, primary_key=True, index=True)
    chama_id = Column(Integer, ForeignKey("chamas.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    role = Column(String, default="member")
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)
    total_contributions = Column(Float, default=0.0)

    # Relationships
    chama = relationship("Chama", back_populates="members")
    user = relationship("User")
    contributions = relationship("ChamaContribution", back_populates="member")

class ChamaContribution(Base):
    __tablename__ = "chama_contributions"

    id = Column(Integer, primary_key=True, index=True)
    chama_id = Column(Integer, ForeignKey("chamas.id"))
    member_id = Column(Integer, ForeignKey("chama_members.id"))
    amount = Column(Float, nullable=False)
    contribution_month = Column(String)  # e.g., "2025-10"
    status = Column(String, default="pending")
    paid_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    chama = relationship("Chama", back_populates="contributions")
    member = relationship("ChamaMember", back_populates="contributions")