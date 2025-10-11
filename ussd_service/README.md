# TajiriCircle USSD Service

This is a standalone USSD service for TajiriCircle that runs independently from the main web application.

## Features

- Registration flow for new users
- Main menu navigation
- Chama services (Join, Create, View, Contribute)
- Trust Score display
- Savings management
- Multi-language support (English/Swahili)

## Quick Start

```bash
# Start the USSD service
cd ussd_service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload

# Test the service
curl -X POST http://localhost:8001/ussd \
  -F "sessionId=test123" \
  -F "phoneNumber=+254700123456" \
  -F "text="
```

## Testing

Visit http://localhost:8001/test for a web-based USSD simulator.

## Africa's Talking Integration

Set your webhook URL to: `https://yourdomain.com/ussd`