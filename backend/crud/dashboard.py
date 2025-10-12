from sqlalchemy.orm import Session
from sqlalchemy import and_, func, extract
from models.user import User
from models.transaction import Transaction
# from models.chama import Chama, ChamaMember  # Will implement when needed
from schemas.dashboard import (
    DashboardData, DashboardMetrics, RecentActivity, DashboardInsight,
    ChamaOverview, LoanOverview, FraudAlertSummary, DashboardAnalytics
)
from crud.transaction import get_transaction_summary
from datetime import datetime, timedelta
from typing import List, Dict, Any
import calendar

def get_dashboard_data(db: Session, user_id: int) -> DashboardData:
    """Get comprehensive dashboard data for user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")
    
    # Get metrics
    metrics = calculate_dashboard_metrics(db, user_id)
    
    # Get transaction summary
    transaction_summary = get_transaction_summary(db, user_id)
    
    # Get recent transactions (last 10)
    recent_transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).order_by(Transaction.transaction_date.desc()).limit(10).all()
    
    # Get recent activities
    recent_activities = generate_recent_activities(db, user_id)
    
    # Generate insights
    insights = generate_insights(db, user_id, metrics)
    
    # Get chama overview
    chama_overview = get_chama_overview(db, user_id)
    
    # Get fraud alerts summary
    fraud_alerts = FraudAlertSummary(
        active_alerts=0,  # Placeholder - implement based on fraud detection
        resolved_this_month=5,
        risk_level="low"
    )
    
    return DashboardData(
        user_id=user_id,
        metrics=metrics,
        transaction_summary=transaction_summary,
        recent_transactions=recent_transactions,
        recent_activities=recent_activities,
        insights=insights,
        chama_overview=chama_overview,
        fraud_alerts=fraud_alerts,
        last_updated=datetime.now()
    )

def calculate_dashboard_metrics(db: Session, user_id: int) -> DashboardMetrics:
    """Calculate key dashboard metrics"""
    # Get transactions for the last 30 days
    thirty_days_ago = datetime.now() - timedelta(days=30)
    
    transactions = db.query(Transaction).filter(
        and_(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= thirty_days_ago
        )
    ).all()
    
    # Calculate metrics
    total_income = sum(t.amount for t in transactions if t.transaction_type == 'incoming')
    total_expenses = sum(t.amount for t in transactions if t.transaction_type == 'outgoing')
    
    # Get latest balance (simplified - should be from account balance API)
    latest_transaction = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.balance_after.isnot(None)
    ).order_by(Transaction.transaction_date.desc()).first()
    
    current_balance = latest_transaction.balance_after if latest_transaction else 0.0
    
    # Calculate savings rate
    savings_rate = ((total_income - total_expenses) / total_income * 100) if total_income > 0 else 0
    
    # Get user's green score
    user = db.query(User).filter(User.id == user_id).first()
    green_score = user.green_score if user else 0
    
    # Calculate business growth (simplified)
    business_growth_rate = 15.5  # Placeholder - implement based on business transactions
    
    return DashboardMetrics(
        total_balance=current_balance,
        monthly_income=total_income,
        monthly_expenses=total_expenses,
        savings_rate=savings_rate,
        green_score=green_score,
        business_growth_rate=business_growth_rate
    )

def generate_recent_activities(db: Session, user_id: int) -> List[RecentActivity]:
    """Generate recent activities for dashboard"""
    activities = []
    
    # Get recent transactions
    recent_transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).order_by(Transaction.transaction_date.desc()).limit(5).all()
    
    for txn in recent_transactions:
        activity_type = "income" if txn.transaction_type == 'incoming' else "expense"
        description = f"Received KES {txn.amount:,.2f}" if txn.transaction_type == 'incoming' else f"Sent KES {txn.amount:,.2f}"
        if txn.counterparty_name:
            description += f" {'from' if txn.transaction_type == 'incoming' else 'to'} {txn.counterparty_name}"
        
        activities.append(RecentActivity(
            type=activity_type,
            description=description,
            amount=txn.amount,
            date=txn.transaction_date,
            status="completed"
        ))
    
    return activities

def generate_insights(db: Session, user_id: int, metrics: DashboardMetrics) -> List[DashboardInsight]:
    """Generate personalized insights for user"""
    insights = []
    
    # Savings insight
    if metrics.savings_rate > 20:
        insights.append(DashboardInsight(
            type="achievement",
            title="Great Savings!",
            message=f"You're saving {metrics.savings_rate:.1f}% of your income. Keep it up!",
            action_text="View Savings Plan"
        ))
    elif metrics.savings_rate < 5:
        insights.append(DashboardInsight(
            type="tip",
            title="Improve Your Savings",
            message="Consider setting aside 10-20% of your income for savings.",
            action_text="Create Savings Goal"
        ))
    
    # Green score insight
    if metrics.green_score < 50:
        insights.append(DashboardInsight(
            type="opportunity",
            title="Boost Your Green Score",
            message="Eco-friendly practices can help you qualify for better loan rates.",
            action_text="Learn More"
        ))
    
    # Business growth insight
    if metrics.business_growth_rate > 10:
        insights.append(DashboardInsight(
            type="achievement",
            title="Business Growing!",
            message=f"Your business revenue has grown {metrics.business_growth_rate:.1f}% this month.",
            action_text="View Analytics"
        ))
    
    return insights

def get_chama_overview(db: Session, user_id: int) -> ChamaOverview:
    """Get chama overview for user"""
    # This is a simplified version - implement based on actual chama models
    return ChamaOverview(
        total_chamas=2,
        total_contributions=45000.0,
        next_contribution_due=datetime.now() + timedelta(days=7),
        top_performing_chama="Umoja Savings Group"
    )

def get_dashboard_analytics(db: Session, user_id: int) -> DashboardAnalytics:
    """Get detailed analytics for dashboard"""
    
    # Monthly income/expense trends (last 6 months)
    six_months_ago = datetime.now() - timedelta(days=180)
    
    monthly_data = db.query(
        extract('month', Transaction.transaction_date).label('month'),
        extract('year', Transaction.transaction_date).label('year'),
        Transaction.transaction_type,
        func.sum(Transaction.amount).label('total_amount')
    ).filter(
        and_(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= six_months_ago
        )
    ).group_by(
        extract('month', Transaction.transaction_date),
        extract('year', Transaction.transaction_date),
        Transaction.transaction_type
    ).all()
    
    # Process monthly trends
    monthly_income_trend = []
    monthly_expense_trend = []
    
    for data in monthly_data:
        month_name = calendar.month_name[int(data.month)]
        if data.transaction_type == 'incoming':
            monthly_income_trend.append({
                "month": month_name,
                "amount": float(data.total_amount),
                "year": int(data.year)
            })
        else:
            monthly_expense_trend.append({
                "month": month_name,
                "amount": float(data.total_amount),
                "year": int(data.year)
            })
    
    # Category spending
    category_data = db.query(
        Transaction.category,
        func.sum(Transaction.amount).label('total_amount'),
        func.count(Transaction.id).label('transaction_count')
    ).filter(
        and_(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= six_months_ago,
            Transaction.transaction_type == 'outgoing'
        )
    ).group_by(Transaction.category).all()
    
    total_spending = sum(float(c.total_amount) for c in category_data)
    category_spending = []
    for category in category_data:
        if category.category:
            percentage = (float(category.total_amount) / total_spending * 100) if total_spending > 0 else 0
            category_spending.append({
                "category": category.category,
                "amount": float(category.total_amount),
                "percentage": percentage,
                "transactions": int(category.transaction_count)
            })
    
    # Green score history (mock data for now)
    user = db.query(User).filter(User.id == user_id).first()
    current_green_score = user.green_score if user else 0
    
    green_score_history = [
        {"month": "May", "score": max(0, current_green_score - 15)},
        {"month": "Jun", "score": max(0, current_green_score - 10)},
        {"month": "Jul", "score": max(0, current_green_score - 5)},
        {"month": "Aug", "score": current_green_score}
    ]
    
    return DashboardAnalytics(
        user_id=user_id,
        monthly_income_trend=monthly_income_trend,
        monthly_expense_trend=monthly_expense_trend,
        category_spending=category_spending,
        business_revenue_trend=[],  # Implement based on business transactions
        customer_transaction_frequency={},  # Implement based on counterparty analysis
        peak_transaction_hours=[],  # Implement based on transaction timestamps
        green_score_history=green_score_history,
        eco_friendly_transactions=[],  # Implement based on transaction categorization
        carbon_footprint_data={},  # Implement based on eco actions
        cash_flow_forecast=[],  # Implement predictive modeling
        savings_projection={},  # Implement based on savings trends
        loan_eligibility_score=current_green_score + 20,  # Simplified calculation
        generated_at=datetime.now()
    )