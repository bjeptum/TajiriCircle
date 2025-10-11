from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api_v1.api import api_router
from core.config import settings

app = FastAPI(title="TajiriCircle API", openapi_url="/api/openapi.json")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to TajiriCircle API!"}