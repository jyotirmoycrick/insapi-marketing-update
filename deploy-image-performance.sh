#!/bin/bash

# ============================================
# Image Performance Optimization Deployment
# ============================================
# This script deploys Phase 1 critical image performance fixes
# Expected improvements:
# - Mobile PageSpeed: +10-15 points
# - Desktop PageSpeed: +5-10 points
# - LCP: -30-50% reduction
# - CLS: Near zero layout shifts

set -e

echo "🚀 Deploying Image Performance Optimizations..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# Step 1: Build Frontend
# ============================================
echo -e "${BLUE}📦 Building optimized frontend...${NC}"
cd frontend
npm run build
cd ..
echo -e "${GREEN}✅ Frontend built successfully${NC}"
echo ""

# ============================================
# Step 2: Deploy to VPS
# ============================================
echo -e "${BLUE}🌐 Deploying to VPS...${NC}"

# Replace with your VPS details
VPS_USER="root"
VPS_HOST="187.124.99.185"
VPS_PATH="/root/insapi-marketing"

echo "Uploading optimized files to VPS..."

# Upload optimized components
scp -r frontend/dist/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/frontend/dist/

echo -e "${GREEN}✅ Files uploaded successfully${NC}"
echo ""

# ============================================
# Step 3: Restart Services
# ============================================
echo -e "${BLUE}🔄 Restarting services on VPS...${NC}"

ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
cd /root/insapi-marketing

# Restart Nginx to clear cache
sudo systemctl reload nginx

echo "✅ Services restarted"
ENDSSH

echo -e "${GREEN}✅ Services restarted successfully${NC}"
echo ""

# ============================================
# Step 4: Verify Deployment
# ============================================
echo -e "${BLUE}🔍 Verifying deployment...${NC}"

# Test if site is accessible
if curl -s -o /dev/null -w "%{http_code}" https://insapimarketing.com | grep -q "200"; then
    echo -e "${GREEN}✅ Site is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Site may not be accessible yet${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "============================================"
echo "📊 Performance Improvements Deployed:"
echo "============================================"
echo "✅ Logo image optimized (eager loading, dimensions)"
echo "✅ About section images optimized (eager loading, dimensions)"
echo "✅ Service cards optimized (first 3 eager, rest lazy)"
echo "✅ All images use OptimizedImage component"
echo "✅ Proper width/height dimensions prevent layout shifts"
echo "✅ Above-fold images load with high priority"
echo ""
echo "============================================"
echo "🧪 Testing Instructions:"
echo "============================================"
echo "1. Clear browser cache (Ctrl+Shift+Delete)"
echo "2. Open: https://insapimarketing.com"
echo "3. Open DevTools → Network tab"
echo "4. Verify images load with correct priority"
echo "5. Run Lighthouse audit (DevTools → Lighthouse)"
echo ""
echo "Expected Results:"
echo "- Mobile Performance: 75-85 (was 60-70)"
echo "- Desktop Performance: 85-90 (was 75-85)"
echo "- LCP: 1.5-2s (was 3-5s)"
echo "- CLS: <0.1 (was 0.15-0.25)"
echo ""
echo "============================================"
echo "📈 Next Steps (Phase 2):"
echo "============================================"
echo "- Add dimensions to all widget images"
echo "- Add dimensions to FAQ images"
echo "- Add dimensions to content section images"
echo "- Generate responsive image variants"
echo "- Convert remaining PNG images to WebP"
echo ""
echo "For full implementation plan, see:"
echo "COMPREHENSIVE_IMAGE_PERFORMANCE_AUDIT.md"
echo ""
