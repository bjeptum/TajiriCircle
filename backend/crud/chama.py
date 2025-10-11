from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, func, desc
from models.chama import Chama, ChamaMember, ChamaContribution, MemberRole, ContributionStatus, ChamaStatus
from models.user import User
from schemas.chama import ChamaCreate, ChamaUpdate, ChamaMemberCreate, ContributionCreate
from typing import List, Optional
from datetime import datetime

class ChamaCRUD:
    
    def create_chama(self, db: Session, chama_data: ChamaCreate, creator_id: int) -> Chama:
        """Create a new chama and add creator as admin"""
        
        # Create chama
        chama = Chama(
            name=chama_data.name,
            description=chama_data.description,
            monthly_contribution=chama_data.monthly_contribution,
            meeting_day=chama_data.meeting_day,
            created_by=creator_id,
            status="active"
        )
        
        db.add(chama)
        db.flush()  # Get chama ID
        
        # Add creator as admin member
        admin_member = ChamaMember(
            chama_id=chama.id,
            user_id=creator_id,
            role="admin",
            is_active=True
        )
        
        db.add(admin_member)
        db.commit()
        db.refresh(chama)
        
        return chama
    
    def get_chama_by_id(self, db: Session, chama_id: int, user_id: int = None) -> Optional[Chama]:
        """Get chama with all related data"""
        
        query = db.query(Chama).options(
            joinedload(Chama.members).joinedload(ChamaMember.user),
            joinedload(Chama.contributions).joinedload(ChamaContribution.member),
            joinedload(Chama.creator)
        ).filter(Chama.id == chama_id)
        
        chama = query.first()
        
        if not chama:
            return None
            
        # If user_id provided, check if user is member
        if user_id:
            is_member = db.query(ChamaMember).filter(
                and_(ChamaMember.chama_id == chama_id, ChamaMember.user_id == user_id)
            ).first()
            if not is_member:
                return None
                
        return chama
    
    def get_user_chamas(self, db: Session, user_id: int) -> List[Chama]:
        """Get all chamas where user is a member"""
        
        return db.query(Chama).join(ChamaMember).filter(
            and_(ChamaMember.user_id == user_id, ChamaMember.is_active == True)
        ).options(
            joinedload(Chama.members)
        ).all()
    
    def add_member(self, db: Session, chama_id: int, member_data: ChamaMemberCreate, added_by: int) -> ChamaMember:
        """Add new member to chama"""
        
        # Check if adder has admin/treasurer rights
        adder_member = db.query(ChamaMember).filter(
            and_(
                ChamaMember.chama_id == chama_id, 
                ChamaMember.user_id == added_by,
                ChamaMember.role.in_(["admin", "treasurer"])
            )
        ).first()
        
        if not adder_member:
            raise ValueError("Only admin or treasurer can add members")
        
        # Find user by phone
        user = db.query(User).filter(User.phone == member_data.user_phone).first()
        if not user:
            raise ValueError("User not found with this phone number")
        
        # Check if already member
        existing_member = db.query(ChamaMember).filter(
            and_(ChamaMember.chama_id == chama_id, ChamaMember.user_id == user.id)
        ).first()
        
        if existing_member:
            if existing_member.is_active:
                raise ValueError("User is already an active member")
            else:
                # Reactivate member
                existing_member.is_active = True
                existing_member.role = member_data.role
                db.commit()
                return existing_member
        
        # Create new member
        new_member = ChamaMember(
            chama_id=chama_id,
            user_id=user.id,
            role=member_data.role,
            is_active=True
        )
        
        db.add(new_member)
        
        # Update chama member count
        chama = db.query(Chama).filter(Chama.id == chama_id).first()
        chama.total_members = db.query(ChamaMember).filter(
            and_(ChamaMember.chama_id == chama_id, ChamaMember.is_active == True)
        ).count() + 1
        
        db.commit()
        db.refresh(new_member)
        
        return new_member
    
    def record_contribution(self, db: Session, chama_id: int, member_id: int, contribution_data: ContributionCreate) -> ChamaContribution:
        """Record a member's contribution"""
        
        # Check if contribution already exists for this month
        existing = db.query(ChamaContribution).filter(
            and_(
                ChamaContribution.chama_id == chama_id,
                ChamaContribution.member_id == member_id,
                ChamaContribution.contribution_month == contribution_data.contribution_month
            )
        ).first()
        
        if existing:
            raise ValueError("Contribution already recorded for this month")
        
        # Create contribution record
        contribution = ChamaContribution(
            chama_id=chama_id,
            member_id=member_id,
            amount=contribution_data.amount,
            contribution_month=contribution_data.contribution_month,
            status="paid",
            paid_at=datetime.utcnow()
        )
        
        db.add(contribution)
        
        # Update member's total contributions
        member = db.query(ChamaMember).filter(ChamaMember.id == member_id).first()
        member.total_contributions += contribution_data.amount
        
        # Update chama's total savings
        chama = db.query(Chama).filter(Chama.id == chama_id).first()
        chama.total_savings += contribution_data.amount
        
        db.commit()
        db.refresh(contribution)
        
        return contribution
    
    def get_chama_summary(self, db: Session, user_id: int) -> dict:
        """Get user's chama summary for dashboard"""
        
        # Get user's active memberships
        memberships = db.query(ChamaMember).filter(
            and_(ChamaMember.user_id == user_id, ChamaMember.is_active == True)
        ).all()
        
        chama_ids = [m.chama_id for m in memberships]
        
        if not chama_ids:
            return {
                "total_chamas": 0,
                "total_savings": 0.0,
                "monthly_contributions_due": 0.0,
                "pending_contributions": 0,
                "active_memberships": 0
            }
        
        # Get chamas data
        chamas = db.query(Chama).filter(Chama.id.in_(chama_ids)).all()
        
        total_savings = sum([chama.total_savings for chama in chamas])
        monthly_due = sum([chama.monthly_contribution for chama in chamas])
        
        # Get pending contributions for current month
        current_month = datetime.now().strftime("%Y-%m")
        pending_contributions = db.query(ChamaContribution).filter(
            and_(
                ChamaContribution.chama_id.in_(chama_ids),
                ChamaContribution.contribution_month == current_month,
                ChamaContribution.status == "pending"
            )
        ).count()
        
        return {
            "total_chamas": len(chamas),
            "total_savings": total_savings,
            "monthly_contributions_due": monthly_due,
            "pending_contributions": pending_contributions,
            "active_memberships": len(memberships)
        }

# Create instance
chama_crud = ChamaCRUD()