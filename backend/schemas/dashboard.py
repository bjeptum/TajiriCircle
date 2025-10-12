from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from schemas.transaction import TransactionSummary, TransactionResponse

class DashboardMetrics(BaseModel):
    total_balance: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    green_score: int
    business_growth_rate: float

class RecentActivity(BaseModel):
    type: str  # transaction, chama_contribution, loan_payment, etc.
    description: str
    amount: Optional[float] = None
    date: datetime
    status: str

class DashboardInsight(BaseModel):
    type: str  # tip, warning, opportunity, achievement
    title: str
    message: str
    action_text: Optional[str] = None
    action_url: Optional[str] = None

class ChamaOverview(BaseModel):
    total_chamas: int
    total_contributions: float
    next_contribution_due: Optional[datetime] = None
    top_performing_chama: Optional[str] = None

class LoanOverview(BaseModel):
    active_loans: int
    total_loan_amount: float
    next_payment_due: Optional[datetime] = None
    next_payment_amount: Optional[float] = None
    loan_performance_score: int

class FraudAlertSummary(BaseModel):
    active_alerts: int
    resolved_this_month: int
    risk_level: str  # low, medium, high

class DashboardData(BaseModel):
    user_id: int
    metrics: DashboardMetrics
    transaction_summary: TransactionSummary
    recent_transactions: List[TransactionResponse]
    recent_activities: List[RecentActivity]
    insights: List[DashboardInsight]
    chama_overview: ChamaOverview
    loan_overview: Optional[LoanOverview] = None
    fraud_alerts: FraudAlertSummary
    last_updated: datetime

class DashboardAnalytics(BaseModel):
    user_id: int
    # Monthly trends
    monthly_income_trend: List[Dict[str, Any]]  # [{month, amount}, ...]
    monthly_expense_trend: List[Dict[str, Any]]
    category_spending: List[Dict[str, Any]]  # [{category, amount, percentage}, ...]
    
    # Business analytics
    business_revenue_trend: List[Dict[str, Any]]
    customer_transaction_frequency: Dict[str, Any]
    peak_transaction_hours: List[Dict[str, Any]]
    
    # Green finance analytics
    green_score_history: List[Dict[str, Any]]
    eco_friendly_transactions: List[Dict[str, Any]]
    carbon_footprint_data: Dict[str, Any]
    
    # Predictive insights
    cash_flow_forecast: List[Dict[str, Any]]
    savings_projection: Dict[str, Any]
    loan_eligibility_score: int
    
    generated_at: datetime