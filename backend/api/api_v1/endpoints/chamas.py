from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from crud.chama import chama_crud
from schemas.chama import (
    ChamaCreate, ChamaResponse, ChamaListResponse, ChamaUpdate,
    ChamaMemberCreate, ChamaMemberResponse, 
    ContributionCreate, ChamaContributionResponse,
    ChamaSummary
)
from datetime import datetime

router = APIRouter()

@router.post("/create", response_model=ChamaResponse)
async def create_chama(
    chama_data: ChamaCreate,
    creator_id: int = 1,  # TODO: Get from JWT token
    db: Session = Depends(get_db)
):
    """Create a new chama"""
    try:
        chama = chama_crud.create_chama(db, chama_data, creator_id)
        
        # Fetch with all relations for response
        chama_with_relations = chama_crud.get_chama_by_id(db, chama.id, creator_id)
        
        return format_chama_response(chama_with_relations)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/user/{user_id}", response_model=List[ChamaListResponse])
async def get_user_chamas(
    user_id: int,
    db: Session = Depends(get_db)
):
    """Get all chamas for a user"""
    try:
        chamas = chama_crud.get_user_chamas(db, user_id)
        
        response = []
        current_month = datetime.now().strftime("%Y-%m")
        
        for chama in chamas:
            # Get user's role in this chama
            user_member = next(
                (m for m in chama.members if m.user_id == user_id), 
                None
            )
            
            # Check contribution status for current month
            contribution_status = None
            if user_member:
                from models.chama import ChamaContribution
                contribution = db.query(ChamaContribution).filter(
                    ChamaContribution.member_id == user_member.id,
                    ChamaContribution.contribution_month == current_month
                ).first()
                
                if contribution:
                    contribution_status = contribution.status
                else:
                    contribution_status = "pending"
            
            response.append(ChamaListResponse(
                id=chama.id,
                name=chama.name,
                description=chama.description,
                total_members=chama.total_members,
                monthly_contribution=chama.monthly_contribution,
                total_savings=chama.total_savings,
                status=chama.status,
                created_at=chama.created_at,
                user_role=user_member.role if user_member else None,
                current_month_status=contribution_status
            ))
        
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{chama_id}", response_model=ChamaResponse)
async def get_chama_details(
    chama_id: int,
    user_id: int = 1,  # TODO: Get from JWT token
    db: Session = Depends(get_db)
):
    """Get detailed chama information"""
    try:
        chama = chama_crud.get_chama_by_id(db, chama_id, user_id)
        
        if not chama:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chama not found or you're not a member"
            )
        
        return format_chama_response(chama)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/{chama_id}/members", response_model=ChamaMemberResponse)
async def add_chama_member(
    chama_id: int,
    member_data: ChamaMemberCreate,
    added_by: int = 1,  # TODO: Get from JWT token
    db: Session = Depends(get_db)
):
    """Add a new member to chama"""
    try:
        member = chama_crud.add_member(db, chama_id, member_data, added_by)
        
        # Get user details for response
        from models.user import User
        user = db.query(User).filter(User.id == member.user_id).first()
        
        return ChamaMemberResponse(
            id=member.id,
            user_id=member.user_id,
            role=member.role,
            joined_at=member.joined_at,
            is_active=member.is_active,
            total_contributions=member.total_contributions,
            user_phone=user.phone if user else None
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/{chama_id}/contributions", response_model=ChamaContributionResponse)
async def record_contribution(
    chama_id: int,
    contribution_data: ContributionCreate,
    user_id: int = 1,  # TODO: Get from JWT token
    db: Session = Depends(get_db)
):
    """Record a contribution"""
    try:
        # Get member record
        from models.chama import ChamaMember
        member = db.query(ChamaMember).filter(
            ChamaMember.chama_id == chama_id,
            ChamaMember.user_id == user_id,
            ChamaMember.is_active == True
        ).first()
        
        if not member:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="You are not an active member of this chama"
            )
        
        contribution = chama_crud.record_contribution(db, chama_id, member.id, contribution_data)
        
        return ChamaContributionResponse(
            id=contribution.id,
            member_id=contribution.member_id,
            amount=contribution.amount,
            contribution_month=contribution.contribution_month,
            status=contribution.status,
            paid_at=contribution.paid_at,
            created_at=contribution.created_at,
            member_phone=member.user.phone if member.user else None,
            member_role=member.role
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/summary/{user_id}", response_model=ChamaSummary)
async def get_chama_summary(
    user_id: int,
    db: Session = Depends(get_db)
):
    """Get user's chama summary for dashboard"""
    try:
        summary = chama_crud.get_chama_summary(db, user_id)
        return ChamaSummary(**summary)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

def format_chama_response(chama) -> ChamaResponse:
    """Format chama object for API response"""
    
    # Format members
    members = []
    for member in chama.members:
        members.append(ChamaMemberResponse(
            id=member.id,
            user_id=member.user_id,
            role=member.role,
            joined_at=member.joined_at,
            is_active=member.is_active,
            total_contributions=member.total_contributions,
            user_phone=member.user.phone if member.user else None
        ))
    
    # Format recent contributions (last 10)
    recent_contributions = []
    sorted_contributions = sorted(chama.contributions, key=lambda x: x.created_at, reverse=True)[:10]
    
    for contribution in sorted_contributions:
        recent_contributions.append(ChamaContributionResponse(
            id=contribution.id,
            member_id=contribution.member_id,
            amount=contribution.amount,
            contribution_month=contribution.contribution_month,
            status=contribution.status,
            paid_at=contribution.paid_at,
            created_at=contribution.created_at,
            member_phone=contribution.member.user.phone if contribution.member and contribution.member.user else None,
            member_role=contribution.member.role if contribution.member else None
        ))
    
    return ChamaResponse(
        id=chama.id,
        name=chama.name,
        description=chama.description,
        total_members=chama.total_members,
        monthly_contribution=chama.monthly_contribution,
        meeting_day=chama.meeting_day,
        total_savings=chama.total_savings,
        created_by=chama.created_by,
        status=chama.status,
        created_at=chama.created_at,
        updated_at=chama.updated_at,
        members=members,
        recent_contributions=recent_contributions,
        creator_phone=chama.creator.phone if chama.creator else None
    )