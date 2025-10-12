from sqlalchemy.orm import DeclarativeBase, declared_attr
from typing import Any

class Base(DeclarativeBase):
    """Base class for all database models"""
    
    # Generate __tablename__ automatically
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()