#!/bin/bash

# Quick Fix Script for /fast-admin route on VPS
# This script automates the fix process

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Quick Fix: /fast-admin Route"
echo -e "==========================================${NC}"
echo ""

# Get the current directory
APP_DIR=$(pwd)

# Configuration
BACKEND_IP="187.124.99.185"
BACKEND_PORT="8000"
DOMAIN="insapimarketing.com"

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Directory: $APP_DIR"
echo "  Backend: http://$BACKEND_IP:$BACKEND_PORT/api"
echo "  Domain: $DOMAIN"
echo ""

read -p "Is this correct? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please edit this script to set correct values"
    exit 1
fi

# Step 1: Update frontend .env
echo -e "${GREEN}[1/5] Updating frontend .env...${NC}"
cd "$APP_DIR/frontend"

cat > .env << EOF
VITE_API_URL=http://$BACKEND_IP:$BACKEND_PORT/api
EOF

echo -e "${GREEN}✓ Updated .env file${NC}"
cat .env
echo ""

# Step 2: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Step 3: Build frontend
echo -e "${GREEN}[2/5] Building frontend...${NC}"
npm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Update Nginx configuration
echo -e "${GREEN}[3/5] Checking Nginx configuration...${NC}"

NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"

if [ -f "$NGINX_CONFIG" ]; then
    echo "Nginx config found at: $NGINX_CONFIG"
    
    # Check if try_files exists
    if grep -q "try_files.*index.html" "$NGINX_CONFIG"; then
        echo -e "${GREEN}✓ try_files directive already exists${NC}"
    else
        echo -e "${YELLOW}⚠ try_files directive missing${NC}"
        echo "Please add this to your Nginx config manually:"
        echo ""
        echo "  location / {"
        echo "      try_files \$uri \$uri/ /index.html;"
        echo "  }"
        echo ""
        read -p "Press Enter after updating Nginx config..."
    fi
else
    echo -e "${YELLOW}⚠ Nginx config not found at $NGINX_CONFIG${NC}"
    echo "Please create Nginx config manually (see VPS_FAST_ADMIN_FIX.md)"
    read -p "Press Enter after creating Nginx config..."
fi
echo ""

# Step 5: Test and restart Nginx
echo -e "${GREEN}[4/5] Restarting Nginx...${NC}"

if sudo nginx -t; then
    echo -e "${GREEN}✓ Nginx config is valid${NC}"
    sudo systemctl restart nginx
    echo -e "${GREEN}✓ Nginx restarted${NC}"
else
    echo -e "${RED}✗ Nginx config has errors${NC}"
    echo "Please fix the errors and run: sudo systemctl restart nginx"
fi
echo ""

# Step 6: Check backend
echo -e "${GREEN}[5/5] Checking backend...${NC}"

cd "$APP_DIR/backend"

if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}✓ Backend is already running${NC}"
    
    # Test API
    if curl -s -f http://localhost:$BACKEND_PORT/api/components/templates > /dev/null; then
        echo -e "${GREEN}✓ Backend API is responding${NC}"
    else
        echo -e "${YELLOW}⚠ Backend API not responding${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Backend is not running${NC}"
    echo "Starting backend..."
    
    # Check if PM2 is available
    if command -v pm2 &> /dev/null; then
        pm2 start server.py --name backend --interpreter python3
        pm2 save
        echo -e "${GREEN}✓ Backend started with PM2${NC}"
    else
        nohup python3 server.py > backend.log 2>&1 &
        echo -e "${GREEN}✓ Backend started in background${NC}"
        echo "  Log file: $APP_DIR/backend/backend.log"
    fi
fi
echo ""

# Final checks
echo -e "${BLUE}=========================================="
echo "Final Checks"
echo -e "==========================================${NC}"
echo ""

# Test backend
echo -e "${YELLOW}Testing backend API...${NC}"
if curl -s -f http://localhost:$BACKEND_PORT/api/components/templates > /dev/null; then
    echo -e "${GREEN}✓ Backend API: OK${NC}"
else
    echo -e "${RED}✗ Backend API: FAILED${NC}"
fi

# Test frontend
echo -e "${YELLOW}Testing frontend...${NC}"
if [ -f "$APP_DIR/frontend/dist/index.html" ]; then
    echo -e "${GREEN}✓ Frontend build: OK${NC}"
else
    echo -e "${RED}✗ Frontend build: FAILED${NC}"
fi

# Test Nginx
echo -e "${YELLOW}Testing Nginx...${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx: Running${NC}"
else
    echo -e "${RED}✗ Nginx: Not running${NC}"
fi

echo ""
echo -e "${BLUE}=========================================="
echo "Done!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Open your browser"
echo "2. Clear cache (Ctrl+Shift+R) or use incognito"
echo "3. Visit: http://$DOMAIN/fast-admin"
echo "4. Login with:"
echo "   Username: malo"
echo "   Password: 1234567890"
echo ""
echo -e "${YELLOW}If it still doesn't work:${NC}"
echo "1. Check browser console for errors (F12)"
echo "2. Check Nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "3. Check backend logs: tail -f $APP_DIR/backend/backend.log"
echo "4. See VPS_FAST_ADMIN_FIX.md for detailed troubleshooting"
echo ""
