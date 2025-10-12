from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from models.transaction import Transaction, SMSParsingLog
from models.user import User
from schemas.transaction import TransactionCreate, TransactionFilter, SMSParseRequest
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import re
import json

def classify_business_transaction(sms_text: str, counterparty: str = None, amount: float = None) -> Dict[str, Any]:
    """
    AI-powered business transaction classifier
    Determines if a transaction is business-related based on patterns
    """
    business_indicators = {
        "high_confidence": [
            "till number", "paybill", "buy goods", "lipa na mpesa", "merchant",
            "shop", "store", "business", "services", "invoice", "payment for"
        ],
        "medium_confidence": [
            "supplier", "client", "customer", "vendor", "contractor", "delivery",
            "materials", "equipment", "stock", "inventory"
        ],
        "low_confidence": [
            "meeting", "office", "work", "project", "deal", "order"
        ]
    }
    
    classification = {
        "is_business": False,
        "confidence": 0.0,
        "category": "personal",
        "subcategory": None,
        "reasoning": []
    }
    
    sms_lower = sms_text.lower()
    
    # Check for business indicators
    for level, indicators in business_indicators.items():
        for indicator in indicators:
            if indicator in sms_lower:
                if level == "high_confidence":
                    classification["confidence"] += 0.3
                elif level == "medium_confidence":
                    classification["confidence"] += 0.2
                else:
                    classification["confidence"] += 0.1
                classification["reasoning"].append(f"Found '{indicator}' ({level})")
    
    # Amount-based classification (business transactions often have round amounts or patterns)
    if amount:
        if amount >= 10000:  # Large amounts more likely business
            classification["confidence"] += 0.1
            classification["reasoning"].append("Large amount suggests business transaction")
        elif amount % 100 == 0 and amount >= 1000:  # Round amounts
            classification["confidence"] += 0.05
            classification["reasoning"].append("Round amount suggests business transaction")
    
    # Counterparty-based classification
    if counterparty:
        business_name_patterns = [
            r'\b(ltd|limited|co|company|corp|corporation|enterprises|solutions|services)\b',
            r'\b(shop|store|mart|supermarket|hotel|restaurant|cafe)\b',
            r'\b(suppliers?|dealers?|traders?|merchants?)\b'
        ]
        
        for pattern in business_name_patterns:
            if re.search(pattern, counterparty.lower()):
                classification["confidence"] += 0.2
                classification["reasoning"].append(f"Business name pattern in counterparty: {counterparty}")
                break
    
    # Final classification
    if classification["confidence"] >= 0.4:
        classification["is_business"] = True
        classification["category"] = "business"
        
        # Determine subcategory
        if any(word in sms_lower for word in ["till", "paybill", "buy goods"]):
            classification["subcategory"] = "payment"
        elif any(word in sms_lower for word in ["supplier", "materials", "stock"]):
            classification["subcategory"] = "procurement"
        elif any(word in sms_lower for word in ["client", "customer", "service"]):
            classification["subcategory"] = "revenue"
        else:
            classification["subcategory"] = "general"
    
    return classification

def create_transaction(db: Session, user_id: int, transaction: TransactionCreate):
    """Create a new transaction"""
    db_transaction = Transaction(
        user_id=user_id,
        **transaction.dict()
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_user_transactions(db: Session, user_id: int, filter_params: Optional[TransactionFilter] = None, 
                         limit: int = 100, offset: int = 0):
    """Get user transactions with optional filtering"""
    query = db.query(Transaction).filter(Transaction.user_id == user_id)
    
    if filter_params:
        if filter_params.start_date:
            query = query.filter(Transaction.transaction_date >= filter_params.start_date)
        if filter_params.end_date:
            query = query.filter(Transaction.transaction_date <= filter_params.end_date)
        if filter_params.transaction_type:
            query = query.filter(Transaction.transaction_type == filter_params.transaction_type)
        if filter_params.category:
            query = query.filter(Transaction.category == filter_params.category)
        if filter_params.min_amount:
            query = query.filter(Transaction.amount >= filter_params.min_amount)
        if filter_params.max_amount:
            query = query.filter(Transaction.amount <= filter_params.max_amount)
    
    return query.order_by(Transaction.transaction_date.desc()).offset(offset).limit(limit).all()

def get_transaction_summary(db: Session, user_id: int, days: int = 30) -> Dict[str, Any]:
    """Get transaction summary for dashboard"""
    start_date = datetime.now() - timedelta(days=days)
    
    # Get transactions for the period
    transactions = db.query(Transaction).filter(
        and_(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= start_date
        )
    ).all()
    
    if not transactions:
        return {
            "total_incoming": 0.0,
            "total_outgoing": 0.0,
            "total_transactions": 0,
            "average_amount": 0.0,
            "business_transactions": 0,
            "business_percentage": 0.0
        }
    
    incoming = sum(t.amount for t in transactions if t.transaction_type == 'incoming')
    outgoing = sum(t.amount for t in transactions if t.transaction_type == 'outgoing')
    total_count = len(transactions)
    business_count = len([t for t in transactions if t.is_business_related])
    
    return {
        "total_incoming": incoming,
        "total_outgoing": outgoing,
        "total_transactions": total_count,
        "average_amount": (incoming + outgoing) / total_count if total_count > 0 else 0,
        "business_transactions": business_count,
        "business_percentage": (business_count / total_count * 100) if total_count > 0 else 0
    }

def parse_mpesa_sms(sms_text: str) -> Dict[str, Any]:
    """
    AI-Enhanced M-Pesa SMS Parser
    Uses intelligent pattern recognition to extract transaction details
    """
    parsed = {
        "success": False,
        "confidence": 0.0,
        "transaction_type": None,
        "amount": None,
        "reference": None,
        "counterparty": None,
        "counterparty_phone": None,
        "balance": None,
        "transaction_date": None,
        "transaction_time": None,
        "extracted_fields": {}
    }
    
    try:
        # Normalize the SMS text
        sms_lower = sms_text.lower()
        
        # 1. Extract M-Pesa Reference Code (Usually 10 alphanumeric characters)
        reference_patterns = [
            r'([A-Z]{2}\d{8})',  # Format: AB12345678
            r'([A-Z0-9]{10})',   # Generic 10-char alphanumeric
            r'([A-Z]{1}\d{9})',  # Format: A123456789
        ]
        
        for pattern in reference_patterns:
            ref_match = re.search(pattern, sms_text)
            if ref_match:
                parsed["reference"] = ref_match.group(1)
                parsed["confidence"] += 0.25
                parsed["extracted_fields"]["reference"] = ref_match.group(1)
                break
        
        # 2. Extract Amount (Multiple currency formats)
        amount_patterns = [
            r'ksh\s?([\d,]+\.?\d*)',           # Ksh5,000.00 or Ksh 5,000
            r'kes\s?([\d,]+\.?\d*)',           # KES5,000.00
            r'(\d{1,3}(?:,\d{3})*\.?\d*)\s?ksh', # 5,000.00 Ksh
            r'amount\s?[:\-]?\s?ksh\s?([\d,]+\.?\d*)', # Amount: Ksh5,000
        ]
        
        for pattern in amount_patterns:
            amount_match = re.search(pattern, sms_lower)
            if amount_match:
                amount_str = amount_match.group(1).replace(',', '')
                parsed["amount"] = float(amount_str)
                parsed["confidence"] += 0.3
                parsed["extracted_fields"]["amount"] = amount_str
                break
        
        # 3. Determine Transaction Type (AI-like classification)
        transaction_keywords = {
            "incoming": [
                "received", "from", "deposit", "credited", "confirmation", "confirmed you have received",
                "cash deposit", "transferred from", "paybill received", "till received"
            ],
            "outgoing": [
                "sent", "to", "withdraw", "debited", "paid", "send money", "lipa na mpesa",
                "paybill", "till number", "buy goods", "cash withdrawal", "sent to"
            ]
        }
        
        transaction_type_confidence = {"incoming": 0, "outgoing": 0}
        
        for trans_type, keywords in transaction_keywords.items():
            for keyword in keywords:
                if keyword in sms_lower:
                    transaction_type_confidence[trans_type] += 1
        
        # Determine the most likely transaction type
        if transaction_type_confidence["incoming"] > transaction_type_confidence["outgoing"]:
            parsed["transaction_type"] = "incoming"
            parsed["confidence"] += 0.2
        elif transaction_type_confidence["outgoing"] > transaction_type_confidence["incoming"]:
            parsed["transaction_type"] = "outgoing"
            parsed["confidence"] += 0.2
        
        parsed["extracted_fields"]["transaction_type_scores"] = transaction_type_confidence
        
        # 4. Extract Counterparty Name and Phone
        counterparty_patterns = [
            r'(?:from|to)\s+([A-Z][A-Z\s]{2,30})\s+(\d{12})',  # From JOHN DOE 254712345678
            r'(?:from|to)\s+([A-Z][A-Z\s]{2,30})\s+on',        # From JOHN DOE on
            r'(?:from|to)\s+([A-Z][A-Z\s]{2,30})\s+\d',        # From JOHN DOE 254
            r'(?:sent to|received from)\s+([A-Z][A-Z\s]{2,30})', # sent to JOHN DOE
        ]
        
        for pattern in counterparty_patterns:
            counterparty_match = re.search(pattern, sms_text, re.IGNORECASE)
            if counterparty_match:
                parsed["counterparty"] = counterparty_match.group(1).strip()
                parsed["confidence"] += 0.15
                parsed["extracted_fields"]["counterparty"] = counterparty_match.group(1).strip()
                break
        
        # Extract phone number separately
        phone_patterns = [
            r'(\d{12})',  # 254712345678
            r'(\+254\d{9})',  # +254712345678
            r'(254\d{9})',    # 254712345678
        ]
        
        for pattern in phone_patterns:
            phone_match = re.search(pattern, sms_text)
            if phone_match:
                parsed["counterparty_phone"] = phone_match.group(1)
                parsed["extracted_fields"]["phone"] = phone_match.group(1)
                break
        
        # 5. Extract Balance
        balance_patterns = [
            r'balance is ksh\s?([\d,]+\.?\d*)',
            r'new balance[:\s]+ksh\s?([\d,]+\.?\d*)',
            r'account balance[:\s]+ksh\s?([\d,]+\.?\d*)',
            r'balance ksh\s?([\d,]+\.?\d*)',
        ]
        
        for pattern in balance_patterns:
            balance_match = re.search(pattern, sms_lower)
            if balance_match:
                balance_str = balance_match.group(1).replace(',', '')
                parsed["balance"] = float(balance_str)
                parsed["confidence"] += 0.15
                parsed["extracted_fields"]["balance"] = balance_str
                break
        
        # 6. Extract Date and Time (AI-enhanced)
        date_patterns = [
            r'(\d{1,2}/\d{1,2}/\d{2,4})',  # 12/10/25 or 12/10/2025
            r'(\d{1,2}-\d{1,2}-\d{2,4})',  # 12-10-25
            r'on (\d{1,2}/\d{1,2}/\d{2,4})', # on 12/10/25
        ]
        
        time_patterns = [
            r'at (\d{1,2}:\d{2})\s?(am|pm)',  # at 12:30 PM
            r'(\d{1,2}:\d{2}:\d{2})',         # 12:30:45
        ]
        
        # Extract date
        for pattern in date_patterns:
            date_match = re.search(pattern, sms_text, re.IGNORECASE)
            if date_match:
                parsed["extracted_fields"]["date"] = date_match.group(1)
                parsed["confidence"] += 0.1
                break
        
        # Extract time
        for pattern in time_patterns:
            time_match = re.search(pattern, sms_text, re.IGNORECASE)
            if time_match:
                if len(time_match.groups()) > 1:
                    parsed["transaction_time"] = f"{time_match.group(1)} {time_match.group(2).upper()}"
                else:
                    parsed["transaction_time"] = time_match.group(1)
                parsed["extracted_fields"]["time"] = parsed["transaction_time"]
                parsed["confidence"] += 0.1
                break
        
        # Set transaction date (use current time if not extracted)
        parsed["transaction_date"] = datetime.now()
        
        # 7. Calculate final confidence and success
        # Bonus confidence for having key fields
        if parsed["amount"] and parsed["reference"]:
            parsed["confidence"] += 0.1
        if parsed["counterparty"] or parsed["counterparty_phone"]:
            parsed["confidence"] += 0.05
        
        # Success threshold
        parsed["success"] = parsed["confidence"] >= 0.6
        
        # Add metadata
        parsed["extracted_fields"]["original_sms"] = sms_text
        parsed["extracted_fields"]["processing_timestamp"] = datetime.now().isoformat()
        
    except Exception as e:
        parsed["error"] = str(e)
        parsed["confidence"] = 0.0
    
    return parsed

def parse_sms_transaction(db: Session, user_id: int, sms_data: SMSParseRequest):
    """Parse SMS and create transaction if valid"""
    
    # Log the parsing attempt
    parsing_log = SMSParsingLog(
        user_id=user_id,
        raw_sms=sms_data.sms_text,
        sender=sms_data.sender,
        parsing_status="processing"
    )
    db.add(parsing_log)
    db.commit()
    
    try:
        # Parse the SMS
        parsed_data = parse_mpesa_sms(sms_data.sms_text)
        
        if parsed_data["success"] and parsed_data["amount"]:
            # Classify if transaction is business-related using AI
            business_classification = classify_business_transaction(
                sms_data.sms_text, 
                parsed_data["counterparty"], 
                parsed_data["amount"]
            )
            
            # Create transaction with enhanced data
            transaction_data = TransactionCreate(
                transaction_type=parsed_data["transaction_type"],
                amount=parsed_data["amount"],
                reference=parsed_data["reference"],
                transaction_date=parsed_data["transaction_date"],
                counterparty_name=parsed_data["counterparty"],
                counterparty_phone=parsed_data["counterparty_phone"],
                balance_after=parsed_data["balance"],
                category=business_classification["category"],
                subcategory=business_classification["subcategory"] or "mpesa",
                description=f"M-Pesa {parsed_data['transaction_type']} transaction",
                is_business_related=business_classification["is_business"],
                confidence_score=parsed_data["confidence"]
            )
            
            transaction = create_transaction(db, user_id, transaction_data)
            transaction.raw_sms = sms_data.sms_text
            transaction.sender = sms_data.sender
            # Convert datetime to string for JSON serialization
            parsed_data_for_json = parsed_data.copy()
            if parsed_data_for_json.get("transaction_date"):
                parsed_data_for_json["transaction_date"] = parsed_data_for_json["transaction_date"].isoformat()
            if parsed_data_for_json.get("extracted_fields", {}).get("processing_timestamp"):
                # Already in ISO format from the parser
                pass
            
            # Include business classification in parsed data
            parsed_data_for_json["business_classification"] = business_classification
            
            transaction.parsed_data = json.dumps(parsed_data_for_json)
            transaction.confidence_score = parsed_data["confidence"]
            
            # Update parsing log
            parsing_log.parsing_status = "success"
            parsing_log.transaction_id = transaction.id
            parsing_log.parsed_fields = json.dumps(parsed_data_for_json)
            
            db.commit()
            db.refresh(transaction)
            
            return {
                "success": True,
                "message": "Transaction parsed and saved successfully",
                "transaction": transaction,
                "confidence_score": parsed_data["confidence"]
            }
        else:
            parsing_log.parsing_status = "failed"
            parsing_log.error_message = "Could not extract required transaction details"
            db.commit()
            
            return {
                "success": False,
                "message": "Could not parse transaction from SMS",
                "confidence_score": parsed_data["confidence"]
            }
            
    except Exception as e:
        parsing_log.parsing_status = "error"
        parsing_log.error_message = str(e)
        db.commit()
        
        return {
            "success": False,
            "message": f"Error parsing SMS: {str(e)}",
            "confidence_score": 0.0
        }