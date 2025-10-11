# TajiriCircle USSD Service
**"Banking the Hustle" - Production-Ready USSD Implementation**

This is a standalone USSD service for TajiriCircle that runs independently from the main web application.

## 🚀 Quick Start

```bash
# Start the USSD service (recommended)
./start_ussd.sh

# Or using Docker
docker-compose up -d

# Test the service
curl -X POST http://localhost:8001/ussd \
  -F "sessionId=test123" \
  -F "phoneNumber=+254700123456" \
  -F "text="
```

## 📋 Complete Documentation

📚 **Documentation**: Complete guide available in `COMPLETE_USSD_GUIDE.md`

- ✅ Complete Chama Management (Create, Join, Contribute, View)
- 🌍 Multi-Language Support (English/Swahili) 
- 🔄 Smart Navigation System (0/00 back navigation)
- ⭐ Dynamic Trust Score System
- 💰 Advanced Savings Management
- 🩶 Enhanced Exit Messages with "Banking the Hustle" branding
- 🧪 Testing Commands & Examples
- 🏗️ Architecture & Security Details

## 🌟 Key Features

- **Complete Chama Management**: Create, join, contribute, and view chamas
- **Multi-Language**: Full English/Kiswahili support
- **Smart Navigation**: Global back navigation (0/00) with error handling
- **Trust Score**: Dynamic scoring based on savings, chama activity, payments
- **Financial Education**: 10+ rotating tips in both languages
- **Enhanced Exit Messages**: "From Invisible to Investable" branding

## 🧪 Testing

- **Web Interface**: http://localhost:8001/test
- **API Health**: http://localhost:8001/health
- **Service Logs**: `./start_ussd.sh logs`

## 🔗 Integration

- **Africa's Talking**: Set webhook to `https://yourdomain.com/ussd`
- **Main Backend**: Integrates with TajiriCircle API on port 8000
- **Redis Sessions**: Maintains user state across USSD interactions