from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from db.base import Base

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String)