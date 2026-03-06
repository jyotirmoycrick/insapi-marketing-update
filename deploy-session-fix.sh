#!/bin/bash

# ============================================
# Session Fix & Card Size Deployment
# ============================================

set -e

echo "🚀 Deploying Session Fix & Card Size Updates..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# Step 1: Build Frontend
# ============================================
echo -e "${BLUE}[1/4] Building frontend...${NC}"
cd frontend
npm run build
cd ..
echo -e "${GREEN}✓ Frontend built${NC}"
echo ""

# ============================================
# Step 2: Deploy Frontend
# ============================================
echo -e "${BLUE}[2/4] Deploying frontend...${NC}"
echo ""
echo "Choose deployment method:"
echo "1) Local server (copy to /var/www/)"
echo "2) Remote VPS (SCP)"
echo "3) Skip frontend deployment"
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    sudo cp -r frontend/dist/* /var/www/insapimarketing.com/
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Frontend deployed locally${NC}"
    ;;
  2)
    scp -r frontend/dist/* root@187.124.99.185:/var/www/insapimarketing.com/
    ssh root@187.124.99.185 "sudo systemctl reload nginx"
    echo -e "${GREEN}✓ Frontend deployed to VPS${NC}"
    ;;
  3)
    echo -e "${YELLOW}⊘ Skipped frontend deployment${NC}"
    ;;
esac

echo ""

# ============================================
# Step 3: Restart Backend
# ============================================
echo -e "${BLUE}[3/4] Restarting backend...${NC}"
echo ""
echo "Choose backend restart method:"
echo "1) Local PM2"
echo "2) Remote VPS PM2"
echo "3) Local direct (pkill + restart)"
echo "4) Skip backend restart"
read -p "Enter choice (1-4): " backend_choice

case $backend_choice in
  1)
    pm2 restart backend
    echo -e "${GREEN}✓ Backend restarted (local PM2)${NC}"
    ;;
  2)
    ssh root@187.124.99.185 "cd /root/insapi-marketing/backend && pm2 restart backend"
    echo -e "${GREEN}✓ Backend restarted (remote PM2)${NC}"
    ;;
  3)
    pkill -f "python3 server.py" || true
    cd backend
    nohup python3 server.py > backend.log 2>&1 &
    cd ..
    echo -e "${GREEN}✓ Backend restarted (direct)${NC}"
    ;;
  4)
    echo -e "${YELLOW}⊘ Skipped backend restart${NC}"
    ;;
esac

echo ""

# ============================================
# Step 4: Verify Deployment
# ============================================
echo -e "${BLUE}[4/4] Verifying deployment...${NC}"
echo ""

# Test frontend
if curl -s -o /dev/null -w "%{http_code}" http://insapimarketing.com | grep -q "200"; then
    echo -e "${GREEN}✓ Frontend accessible${NC}"
else
    echo -e "${YELLOW}⚠ Frontend may not be accessible${NC}"
fi

# Test backend
if curl -s -o /dev/null -w "%{http_code}" http://187.124.99.185:8000/api/components/templates | grep -q "200"; then
    echo -e "${GREEN}✓ Backend API responding${NC}"
else
    echo -e "${YELLOW}⚠ Backend API may not be responding${NC}"
fi

echo ""

# ============================================
# Summary
# ============================================
echo -e "${GREEN}=========================================="
echo "✅ Deployment Complete!"
echo "==========================================${NC}"
echo ""
echo "What was deployed:"
echo "  ✓ Session expiration: 24h → 7 days"
echo "  ✓ Toast notifications for session errors"
echo "  ✓ Service cards: 900x675 → 1000x750"
echo ""
echo "Testing:"
echo "  1. Login: http://insapimarketing.com/fast-admin"
echo "     Username: malo"
echo "     Password: 1234567890"
echo ""
echo "  2. Check service cards:"
echo "     Visit: http://insapimarketing.com"
echo "     Scroll to 'Our Services'"
echo "     Verify cards are larger"
echo ""
echo "  3. Test session:"
echo "     Stay logged in for 7 days"
echo "     Clear error messages if expired"
echo ""
echo "Documentation: SESSION_AND_CARD_SIZE_FIX.md"
echo ""

