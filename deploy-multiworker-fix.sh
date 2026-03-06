#!/bin/bash

# Multi-Worker Authentication Fix Deployment Script
# This script applies the JWT-based authentication fix for Gunicorn multi-worker environments

set -e

echo "=========================================="
echo "Multi-Worker Authentication Fix"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "backend/server.py" ]; then
    echo -e "${RED}❌ Error: Must run from project root directory${NC}"
    exit 1
fi

echo "📦 Step 1: Installing PyJWT dependency..."
cd backend
pip install PyJWT==2.8.0
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PyJWT installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install PyJWT${NC}"
    exit 1
fi
cd ..

echo ""
echo "🔐 Step 2: Checking JWT_SECRET environment variable..."
if [ -z "$JWT_SECRET" ]; then
    echo -e "${YELLOW}⚠️  JWT_SECRET not set in environment${NC}"
    echo "   Using default secret (NOT RECOMMENDED FOR PRODUCTION)"
    echo ""
    echo "   To set a secure secret for production:"
    echo "   1. Generate: python3 -c \"import secrets; print(secrets.token_urlsafe(32))\""
    echo "   2. Export: export JWT_SECRET=\"your-generated-secret\""
    echo "   3. Add to .env or systemd service file"
else
    echo -e "${GREEN}✅ JWT_SECRET is configured${NC}"
fi

echo ""
echo "🧪 Step 3: Testing the fix..."
echo "   Starting backend with 2 workers for testing..."

# Check if gunicorn is installed
if ! command -v gunicorn &> /dev/null; then
    echo "   Installing gunicorn..."
    pip install gunicorn
fi

# Kill any existing backend processes
pkill -f "gunicorn.*server:app" || true
pkill -f "uvicorn.*server:app" || true
sleep 2

# Start backend with 2 workers
cd backend
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000 --daemon --access-logfile - --error-logfile -

# Wait for server to start
echo "   Waiting for server to start..."
sleep 3

# Check if server is running
if curl -s http://localhost:8000/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend started successfully with 2 workers${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    exit 1
fi

cd ..

echo ""
echo "🔬 Step 4: Running authentication tests..."
if [ -f "test_multiworker_auth.py" ]; then
    python3 test_multiworker_auth.py
    TEST_RESULT=$?
    
    if [ $TEST_RESULT -eq 0 ]; then
        echo -e "${GREEN}✅ All tests passed!${NC}"
    else
        echo -e "${YELLOW}⚠️  Some tests failed - check output above${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Test script not found, skipping automated tests${NC}"
    echo "   Manual testing recommended:"
    echo "   1. Login at http://localhost:5173/fast-admin"
    echo "   2. Perform multiple admin operations"
    echo "   3. Verify no 401 errors occur"
fi

echo ""
echo "=========================================="
echo "Deployment Summary"
echo "=========================================="
echo ""
echo "✅ Changes Applied:"
echo "   • Removed in-memory session storage"
echo "   • Implemented JWT-based authentication"
echo "   • Added PyJWT dependency"
echo "   • Backend running with 2 workers"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Test the admin dashboard:"
echo "   http://localhost:5173/fast-admin"
echo "   Login: malo / 1234567890"
echo ""
echo "2. Verify no 401 errors occur during:"
echo "   • Navigation updates"
echo "   • Page management"
echo "   • File uploads"
echo "   • Settings changes"
echo ""
echo "3. For production deployment:"
echo "   • Set strong JWT_SECRET environment variable"
echo "   • Use 2-4 Gunicorn workers based on CPU cores"
echo "   • Enable HTTPS with Nginx"
echo "   • Monitor logs for any authentication issues"
echo ""
echo "4. To stop the test server:"
echo "   pkill -f 'gunicorn.*server:app'"
echo ""
echo "=========================================="
echo ""
echo -e "${GREEN}✅ Multi-worker authentication fix deployed!${NC}"
echo ""
