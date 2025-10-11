#!/bin/bash
# TajiriCircle USSD Service Startup Script

echo "🏦 Starting TajiriCircle USSD Service..."
echo "======================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Start services
echo "📦 Starting services..."
cd "$(dirname "$0")"
docker-compose up -d ussd-service

# Wait a moment for services to start
echo "⏳ Waiting for services to start..."
sleep 5

# Check service health
echo "🏥 Checking service health..."
if curl -s http://localhost:8001/health > /dev/null; then
    echo "✅ USSD Service is running!"
    echo ""
    echo "🌐 Web Tester: http://localhost:8001/test"
    echo "🔗 API Endpoint: http://localhost:8001/ussd"
    echo ""
    echo "📱 Test USSD Flow:"
    echo "  1. Open http://localhost:8001/test in your browser"
    echo "  2. Or use curl commands to test the API"
    echo ""
    echo "🚀 Ready for Africa's Talking integration!"
else
    echo "❌ Service failed to start. Check logs:"
    docker-compose logs ussd-service
fi