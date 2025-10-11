from sqlalchemy.orm import Session
from models.user import User
from schemas.auth import UserCreate

def get_user_by_phone(db: Session, phone: str):
    return db.query(User).filter(User.phone == phone).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(phone=user.phone, hashed_password=user.password)  # Hash password in production
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user