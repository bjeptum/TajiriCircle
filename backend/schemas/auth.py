from pydantic import BaseModel

class UserCreate(BaseModel):
    phone: str
    password: str

class UserResponse(BaseModel):
    id: int
    phone: str

    class Config:
        from_attributes = True