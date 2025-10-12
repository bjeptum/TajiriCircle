from fastapi import APIRouter
from api.api_v1.endpoints import (
    auth, dashboard, fraud_alerts, chamas, ussd, tax_records, chat, transactions,
    bank_auth, bank_applications, sme_applications
)

api_router = APIRouter()

# Authentication and user management
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Dashboard and analytics
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

# Transactions and SMS parsing
api_router.include_router(transactions.router, prefix="", tags=["transactions"])

# Banking APIs
api_router.include_router(bank_auth.router, prefix="/bank/auth", tags=["bank-authentication"])
api_router.include_router(bank_applications.router, prefix="/bank", tags=["bank-applications"])

# SME/Loan Application APIs
api_router.include_router(sme_applications.router, prefix="/sme", tags=["sme-applications"])

# Fraud detection
api_router.include_router(fraud_alerts.router, prefix="/fraud-alerts", tags=["fraud-alerts"])

# Chama (group savings)
api_router.include_router(chamas.router, prefix="/chamas", tags=["chamas"])

# Other services
api_router.include_router(ussd.router, prefix="/ussd", tags=["ussd"])
api_router.include_router(tax_records.router, prefix="/tax-records", tags=["tax-records"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])