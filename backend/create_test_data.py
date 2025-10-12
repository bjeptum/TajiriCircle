#!/usr/bin/env python3
"""Create test data for TajiriCircle."""

import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.config import Settings
from sqlalchemy.orm import sessionmaker
from models.user import User
from models.loan import BankUser, LoanApplication
from crud.auth import hash_password
import random
from datetime import datetime, timedelta

def create_test_data():
    """Create test users and data."""
    settings = Settings()
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        print("Creating test data...")
        
        # Create test regular users
        test_users = [
            {"phone": "+254700000001", "password": "password123", "name": "John Farmer", "business_type": "farmer"},
            {"phone": "+254700000002", "password": "password123", "name": "Mary Salon", "business_type": "salon"},
            {"phone": "+254700000003", "password": "password123", "name": "Peter Welder", "business_type": "welding"},
            {"phone": "+254700000004", "password": "password123", "name": "Grace Shopkeeper", "business_type": "retail"},
        ]
        
        created_users = []
        for user_data in test_users:
            # Check if user exists
            existing_user = db.query(User).filter(User.phone == user_data["phone"]).first()
            if not existing_user:
                # Create user directly
                new_user = User(
                    phone=user_data["phone"],
                    hashed_password=hash_password(user_data["password"]),
                    name=user_data["name"],
                    business_type=user_data["business_type"],
                    is_verified=True
                )
                db.add(new_user)
                db.commit()
                db.refresh(new_user)
                created_users.append(new_user)
                print(f"Created user: {new_user.name} ({new_user.phone})")
            else:
                created_users.append(existing_user)
                print(f"User already exists: {existing_user.name} ({existing_user.phone})")
        
        # Create test bank users
        bank_users = [
            {"email": "admin@bank.com", "password": "admin123", "name": "Bank Admin", "role": "admin"},
            {"email": "loan.officer@bank.com", "password": "officer123", "name": "Loan Officer", "role": "underwriter"},
            {"email": "manager@bank.com", "password": "manager123", "name": "Bank Manager", "role": "manager"},
        ]
        
        for bank_user_data in bank_users:
            # Check if bank user exists
            existing_bank_user = db.query(BankUser).filter(BankUser.email == bank_user_data["email"]).first()
            if not existing_bank_user:
                # Create bank user directly
                new_bank_user = BankUser(
                    email=bank_user_data["email"],
                    hashed_password=hash_password(bank_user_data["password"]),
                    name=bank_user_data["name"],
                    role=bank_user_data["role"],
                    permissions=["read", "write"] if bank_user_data["role"] == "admin" else ["read"],
                    is_active=True
                )
                db.add(new_bank_user)
                db.commit()
                db.refresh(new_bank_user)
                print(f"Created bank user: {new_bank_user.name} ({new_bank_user.email})")
            else:
                print(f"Bank user already exists: {existing_bank_user.name} ({existing_bank_user.email})")
        
        # Create some test loan applications
        print("Creating test loan applications...")
        
        for i, user in enumerate(created_users[:3]):  # Create applications for first 3 users
            # Check if user already has applications
            existing_apps = db.query(LoanApplication).filter(LoanApplication.user_id == user.id).count()
            if existing_apps == 0:
                loan_app = LoanApplication(
                    user_id=user.id,
                    application_number=f"APP{str(random.randint(100000, 999999))}",
                    business_name=f"{user.name}'s Business",
                    business_type=user.business_type or "other",
                    location="Nairobi, Kenya",
                    amount_requested=random.randint(50000, 500000),
                    loan_purpose="Business expansion",
                    loan_term=random.randint(6, 24),
                    status=random.choice(["pending", "under_review", "approved"]),
                    green_score=random.randint(50, 100),
                    applied_date=datetime.now() - timedelta(days=random.randint(1, 30))
                )
                db.add(loan_app)
                print(f"Created loan application for {user.name}")
        
        db.commit()
        print("Test data created successfully!")
        
        print("\n=== Test Login Credentials ===")
        print("Regular Users:")
        for user_data in test_users:
            print(f"  Phone: {user_data['phone']}, Password: {user_data['password']}")
        
        print("\nBank Users:")
        for bank_user_data in bank_users:
            print(f"  Email: {bank_user_data['email']}, Password: {bank_user_data['password']}")
        
    except Exception as e:
        print(f"Error creating test data: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_data()