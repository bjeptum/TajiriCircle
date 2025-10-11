#!/usr/bin/env python3
"""Initialize the database with tables."""

import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine
from db.base import Base
from core.config import Settings

# Import all models to ensure they're registered
from models.user import User
from models.chama import Chama, ChamaMember, ChamaContribution

def init_db():
    """Create database tables."""
    settings = Settings()
    engine = create_engine(settings.DATABASE_URL)
    
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()