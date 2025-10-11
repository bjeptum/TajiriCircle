from fastapi import APIRouter
from api.api_v1.endpoints import auth, dashboard, fraud_alerts, chamas, ussd, tax_records, chat

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(fraud_alerts.router, prefix="/fraud-alerts", tags=["fraud-alerts"])
api_router.include_router(chamas.router, prefix="/chamas", tags=["chamas"])
api_router.include_router(ussd.router, prefix="/ussd", tags=["ussd"])
api_router.include_router(tax_records.router, prefix="/tax-records", tags=["tax-records"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])