#!/bin/bash
# TajiriCircle USSD Service Startup Script
# Enhanced with testing capabilities

echo "🩶 TajiriCircle USSD Service"
echo "\"Banking the Hustle\""
echo "=========================="
echo

# Function to run quick tests
run_tests() {
    echo "🧪 Running Enhanced USSD Tests..."
    echo "--------------------------------"
    
    BASE_URL="http://localhost:8001/ussd"
    
    echo "1. Testing Language Selection & Registration"
    curl -s -X POST $BASE_URL -F "sessionId=test_demo" -F "phoneNumber=+254700987654" -F "text=" | grep -E "(CON|END)" | head -3
    echo
    
    echo "2. Testing English Registration Flow"
    curl -s -X POST $BASE_URL -F "sessionId=test_demo" -F "phoneNumber=+254700987654" -F "text=1*1*Jane Demo*12345678*1" | grep -E "(CON|END)" | head -3
    echo
    
    echo "3. Testing Chama Creation"
    curl -s -X POST $BASE_URL -F "sessionId=test_chama" -F "phoneNumber=+254700123456" -F "text=1*1*Demo Chama*10*1000" | grep -E "(CON|END)" | head -3
    echo
    
    echo "4. Testing Savings Feature"
    curl -s -X POST $BASE_URL -F "sessionId=test_savings" -F "phoneNumber=+254700123456" -F "text=2*1*500*1" | grep -E "(CON|END)" | head -3
    echo
    
    echo "5. Testing Trust Score"
    curl -s -X POST $BASE_URL -F "sessionId=test_trust" -F "phoneNumber=+254700123456" -F "text=3" | grep -E "(CON|END)" | head -3
    echo
    
    echo "6. Testing Financial Tips"
    curl -s -X POST $BASE_URL -F "sessionId=test_tips" -F "phoneNumber=+254700123456" -F "text=4" | grep -E "(CON|END)" | head -3
    echo
    
    echo "7. Testing Error Handling"
    curl -s -X POST $BASE_URL -F "sessionId=test_error" -F "phoneNumber=+254700123456" -F "text=9" | grep -E "(CON|END)" | head -3
    echo
    
    echo "8. Testing Back Navigation (00)"
    curl -s -X POST $BASE_URL -F "sessionId=test_back" -F "phoneNumber=+254700123456" -F "text=1*1*Test*00" | grep -E "(CON|END)" | head -3
    echo
    
    echo "✅ Enhanced Features Test Complete!"
}

# Parse command line arguments
case "$1" in
    "test")
        echo "🧪 Test Mode: Starting service and running tests..."
        echo
        ;;
    "public")
        echo "🌐 Starting with Public URL (Ngrok tunnel)..."
        echo "This will make your USSD service accessible from the internet"
        echo
        ;;
    "deploy")
        echo "🚀 Deployment Options for TajiriCircle USSD"
        echo "=========================================="
        echo
        echo "Choose deployment method:"
        echo "1) 🚀 Railway (Recommended - Free & Fast)"
        echo "2) 🌊 DigitalOcean App Platform"
        echo "3) ☁️  Manual Cloud Setup"
        echo
        echo "Railway Setup:"
        echo "1. Install: npm install -g @railway/cli"
        echo "2. Login: railway login"
        echo "3. Deploy: railway init && cd ussd_service && railway up"
        echo
        echo "DigitalOcean Setup:"
        echo "1. Go to: https://cloud.digitalocean.com/apps"
        echo "2. Connect GitHub repo: bjeptum/TajiriCircle"
        echo "3. Set source: ussd_service directory"
        echo "4. Run command: uvicorn main:app --host 0.0.0.0 --port 8080"
        echo
        echo "Manual Setup:"
        echo "- Deploy ussd_service directory to any cloud provider"
        echo "- Install requirements: pip install -r requirements.txt"
        echo "- Start: uvicorn main:app --host 0.0.0.0 --port \$PORT"
        echo "- Set environment variables from .env file"
        echo
        exit 0
        ;;
    "logs")
        echo "📋 Showing USSD service logs..."
        docker-compose logs -f ussd-service
        exit 0
        ;;
    "stop")
        echo "🛑 Stopping all TajiriCircle services..."
        docker-compose down
        if pgrep -f "ngrok" > /dev/null; then
            echo "🌐 Stopping ngrok tunnel..."
            pkill -f "ngrok"
        fi
        echo "✅ All services stopped."
        exit 0
        ;;
    "restart")
        echo "🔄 Restarting USSD service..."
        docker-compose restart ussd-service
        echo "✅ Service restarted."
        exit 0
        ;;
    "--help"|"-h")
        echo "Usage: ./start_ussd.sh [option]"
        echo ""
        echo "Options:"
        echo "  (none)    Start the USSD service locally"
        echo "  test      Start service and run comprehensive tests"
        echo "  public    Start with public URL (ngrok tunnel for AT testing)"
        echo "  deploy    Show deployment options for cloud platforms"
        echo "  logs      Show service logs"
        echo "  stop      Stop all services"
        echo "  restart   Restart the service"
        echo "  -h, --help Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./start_ussd.sh           # Local development"
        echo "  ./start_ussd.sh public    # Get public URL for Africa's Talking"
        echo "  ./start_ussd.sh test      # Run all tests"
        exit 0
        ;;
esac

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker first."
    echo "💡 Run: sudo systemctl start docker"
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found in current directory"
    echo "💡 Make sure you're running this from the TajiriCircle root directory"
    exit 1
fi

# Start services
echo "📦 Starting TajiriCircle services..."
cd "$(dirname "$0")"

# Start all required services (backend, database, redis, ussd)
echo "🚀 Starting all TajiriCircle services..."
docker-compose up -d db redis backend ussd-service

# Wait a moment for services to start
echo "⏳ Waiting for services to initialize..."
sleep 8

# Check service health
echo "🏥 Checking service health..."
health_check=$(curl -s http://localhost:8001/health 2>/dev/null || echo "failed")

if [[ "$health_check" == *"healthy"* ]] || curl -s http://localhost:8001/health > /dev/null 2>&1; then
    echo "✅ All TajiriCircle services are running!"
    echo ""
    echo "🌐 USSD Web Tester: http://localhost:8001/test"
    echo "🔗 USSD API Endpoint: http://localhost:8001/ussd"
    echo "🏦 Backend API: http://localhost:8000"
    echo "📚 Documentation: ussd_service/COMPLETE_USSD_GUIDE.md"
    echo ""
    echo "📱 Quick Test Commands:"
    echo "  curl -X POST http://localhost:8001/ussd -F \"sessionId=demo\" -F \"phoneNumber=+254700123456\" -F \"text=\""
    echo ""
    
    # Run tests if requested
    if [ "$1" = "test" ]; then
        echo
        run_tests
        
        # Integration test
        echo ""
        echo "🔗 Integration Test"
        echo "=================="
        echo "Testing webhook format for Africa's Talking compatibility..."
        
        response=$(curl -s -X POST "http://localhost:8001/ussd" \
          -F "sessionId=integration_test" \
          -F "phoneNumber=+254700123456" \
          -F "text=" 2>/dev/null)
        
        if [[ "$response" == CON* ]]; then
            echo "✅ Integration test passed - Ready for Africa's Talking!"
        else
            echo "❌ Integration test failed - Check service logs"
        fi
    fi
    
    echo "🎯 Features Available:"
    echo "  ✓ Multi-language support (English/Swahili)"
    echo "  ✓ Complete registration flow (Name + ID + Confirmation)"
    echo "  ✓ Full chama management (Create, Join, Contribute, View)"
    echo "  ✓ Advanced savings (Save, Withdraw, Goals, History)"
    echo "  ✓ Dynamic trust score calculation"
    echo "  ✓ Financial literacy tips (10+ rotating tips)"
    echo "  ✓ Smart navigation (0 back, 00 main menu)"
    echo "  ✓ Comprehensive error handling"
    echo ""
    echo "🚀 Ready for Africa's Talking integration!"
    echo "🩶 Banking the Hustle - Hackathon Ready!"
    
    # Handle public URL option
    if [ "$1" = "public" ]; then
        echo ""
        echo "🌐 Setting up public URL with ngrok..."
        echo "=================================="
        
        # Check if ngrok is installed
        if ! command -v ngrok &> /dev/null; then
            echo "❌ Ngrok not found. Please install it:"
            echo ""
            echo "1. Go to https://ngrok.com/download"
            echo "2. Download and install ngrok"
            echo "3. Sign up and get auth token"
            echo "4. Run: ngrok config add-authtoken YOUR_TOKEN"
            echo ""
            echo "💡 Alternative: Use './start_ussd.sh deploy' for permanent deployment"
            exit 1
        fi
        
        echo "🔗 Starting ngrok tunnel for port 8001..."
        ngrok http 8001 --log=stdout > /tmp/ngrok.log 2>&1 &
        NGROK_PID=$!
        
        # Wait for ngrok to start
        sleep 5
        
        # Get the public URL
        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o '"public_url":"[^"]*https[^"]*' | cut -d'"' -f4)
        
        if [ -n "$NGROK_URL" ]; then
            echo ""
            echo "🎉 SUCCESS! Your USSD service is now publicly accessible:"
            echo ""
            echo "🔗 Public Webhook URL: ${NGROK_URL}/ussd"
            echo "🧪 Test Interface: ${NGROK_URL}/test"
            echo "📊 Ngrok Dashboard: http://localhost:4040"
            echo ""
            echo "📋 For Africa's Talking Configuration:"
            echo "   Service Name: TajiriCircle"
            echo "   Callback URL: ${NGROK_URL}/ussd"
            echo "   Method: POST"
            echo ""
            echo "⚠️  IMPORTANT: This tunnel stays active until you stop it (Ctrl+C)"
            echo "⚠️  For production, use: ./start_ussd.sh deploy"
            echo ""
            
            # Save URL for later reference
            echo "${NGROK_URL}/ussd" > /tmp/tajiri_webhook_url.txt
            echo "📄 Webhook URL saved to: /tmp/tajiri_webhook_url.txt"
            
            # Show Africa's Talking configuration info
            echo ""
            echo "📋 For Africa's Talking Dashboard:"
            echo "================================="
            echo "Service Name: TajiriCircle"
            echo "Description: Banking the Hustle - Digital Chama Platform"
            echo "Callback URL: ${NGROK_URL}/ussd"
            echo "Method: POST"
            echo "Content Type: application/x-www-form-urlencoded"
            echo ""
            echo "Steps:"
            echo "1. Go to: https://account.africastalking.com/auth/login"
            echo "2. Navigate to USSD section"
            echo "3. Create/Edit USSD service with above details"
            echo "4. Test by dialing your shortcode"
            echo ""
            
            # Keep the tunnel running
            echo "🔄 Tunnel is running... Press Ctrl+C to stop"
            trap "echo ''; echo '🛑 Stopping tunnel...'; kill $NGROK_PID 2>/dev/null; exit 0" INT
            wait $NGROK_PID
        else
            echo "❌ Failed to get ngrok URL. Please check ngrok setup."
            kill $NGROK_PID 2>/dev/null
            exit 1
        fi
    fi
    
else
    echo "❌ Service failed to start. Checking logs..."
    docker-compose logs ussd-service | tail -20
    echo ""
    echo "💡 Troubleshooting:"
    echo "  1. Check if ports 8001 and 6379 are available"
    echo "  2. Verify Docker has sufficient resources"
    echo "  3. Run: ./start_ussd.sh logs"
fi