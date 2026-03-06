#!/bin/bash

# VPS Diagnostic Script for /fast-admin issue
# Run this on your VPS to diagnose the problem

echo "=========================================="
echo "VPS Diagnostic Report"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check 1: Frontend .env file
echo -e "${YELLOW}[1] Checking Frontend .env file...${NC}"
if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
    echo "Content:"
    cat frontend/.env
    
    if grep -q "127.0.0.1" frontend/.env; then
        echo -e "${RED}✗ ISSUE: .env points to localhost (127.0.0.1)${NC}"
        echo -e "${YELLOW}  Fix: Change to http://187.124.99.185:8000/api${NC}"
    else
        echo -e "${GREEN}✓ .env looks correct${NC}"
    fi
else
    echo -e "${RED}✗ .env file not found${NC}"
fi
echo ""

# Check 2: Frontend build
echo -e "${YELLOW}[2] Checking Frontend build...${NC}"
if [ -d "frontend/dist" ]; then
    echo -e "${GREEN}✓ dist folder exists${NC}"
    DIST_TIME=$(stat -c %y frontend/dist/index.html 2>/dev/null || stat -f "%Sm" frontend/dist/index.html 2>/dev/null)
    echo "Last built: $DIST_TIME"
    
    ENV_TIME=$(stat -c %y frontend/.env 2>/dev/null || stat -f "%Sm" frontend/.env 2>/dev/null)
    echo ".env modified: $ENV_TIME"
    
    if [ "frontend/.env" -nt "frontend/dist/index.html" ]; then
        echo -e "${RED}✗ ISSUE: .env is newer than build${NC}"
        echo -e "${YELLOW}  Fix: Run 'npm run build' in frontend folder${NC}"
    else
        echo -e "${GREEN}✓ Build is up to date${NC}"
    fi
else
    echo -e "${RED}✗ dist folder not found${NC}"
    echo -e "${YELLOW}  Fix: Run 'npm run build' in frontend folder${NC}"
fi
echo ""

# Check 3: Backend status
echo -e "${YELLOW}[3] Checking Backend status...${NC}"
if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}✓ Backend is running${NC}"
    ps aux | grep "[p]ython.*server.py"
    
    # Test backend API
    if command -v curl &> /dev/null; then
        echo "Testing API endpoint..."
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/components/templates)
        if [ "$RESPONSE" = "200" ]; then
            echo -e "${GREEN}✓ Backend API responding (HTTP $RESPONSE)${NC}"
        else
            echo -e "${RED}✗ Backend API not responding (HTTP $RESPONSE)${NC}"
        fi
    fi
else
    echo -e "${RED}✗ Backend is NOT running${NC}"
    echo -e "${YELLOW}  Fix: Start backend with 'python3 backend/server.py'${NC}"
fi
echo ""

# Check 4: Nginx configuration
echo -e "${YELLOW}[4] Checking Nginx configuration...${NC}"
if [ -f "/etc/nginx/sites-available/insapimarketing" ]; then
    echo -e "${GREEN}✓ Nginx config exists${NC}"
    
    if grep -q "try_files.*index.html" /etc/nginx/sites-available/insapimarketing; then
        echo -e "${GREEN}✓ try_files directive found${NC}"
    else
        echo -e "${RED}✗ ISSUE: try_files directive missing${NC}"
        echo -e "${YELLOW}  Fix: Add 'try_files \$uri \$uri/ /index.html;' to location /${NC}"
    fi
    
    if grep -q "root.*frontend/dist" /etc/nginx/sites-available/insapimarketing; then
        echo -e "${GREEN}✓ Root points to frontend/dist${NC}"
    else
        echo -e "${YELLOW}⚠ Warning: Check if root path is correct${NC}"
    fi
else
    echo -e "${RED}✗ Nginx config not found at expected location${NC}"
    echo "Searching for Nginx configs..."
    find /etc/nginx/sites-available/ -type f 2>/dev/null
fi
echo ""

# Check 5: Nginx status
echo -e "${YELLOW}[5] Checking Nginx status...${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running${NC}"
    
    # Test Nginx config
    if sudo nginx -t 2>&1 | grep -q "successful"; then
        echo -e "${GREEN}✓ Nginx config is valid${NC}"
    else
        echo -e "${RED}✗ Nginx config has errors${NC}"
        sudo nginx -t
    fi
else
    echo -e "${RED}✗ Nginx is NOT running${NC}"
    echo -e "${YELLOW}  Fix: Run 'sudo systemctl start nginx'${NC}"
fi
echo ""

# Check 6: MongoDB status
echo -e "${YELLOW}[6] Checking MongoDB status...${NC}"
if systemctl is-active --quiet mongod; then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${RED}✗ MongoDB is NOT running${NC}"
    echo -e "${YELLOW}  Fix: Run 'sudo systemctl start mongod'${NC}"
fi
echo ""

# Check 7: Port availability
echo -e "${YELLOW}[7] Checking ports...${NC}"
if command -v netstat &> /dev/null || command -v ss &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":8000" || ss -tuln 2>/dev/null | grep -q ":8000"; then
        echo -e "${GREEN}✓ Port 8000 (Backend) is listening${NC}"
    else
        echo -e "${RED}✗ Port 8000 is not listening${NC}"
    fi
    
    if netstat -tuln 2>/dev/null | grep -q ":80" || ss -tuln 2>/dev/null | grep -q ":80"; then
        echo -e "${GREEN}✓ Port 80 (Nginx) is listening${NC}"
    else
        echo -e "${RED}✗ Port 80 is not listening${NC}"
    fi
else
    echo -e "${YELLOW}⚠ netstat/ss not available, skipping port check${NC}"
fi
echo ""

# Summary
echo "=========================================="
echo "Summary & Next Steps"
echo "=========================================="
echo ""
echo "Common fixes:"
echo "1. Update frontend/.env to use VPS IP"
echo "2. Rebuild frontend: cd frontend && npm run build"
echo "3. Add try_files to Nginx config"
echo "4. Restart Nginx: sudo systemctl restart nginx"
echo "5. Start backend if not running"
echo ""
echo "For detailed instructions, see: VPS_FAST_ADMIN_FIX.md"
echo ""
