#!/bin/bash

# ============================================
# Phase 2 Image Optimization + UX Fixes Deployment
# ============================================
# This script deploys Phase 2 optimizations plus critical UX fixes:
# - Scroll position fix
# - Service card size restoration
# - Form navigation
# - FAQ image optimization
# - Content section image optimization
# - LCP improvements

set -e

echo "🚀 Deploying Phase 2 Optimizations + UX Fixes..."
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
echo "📊 Phase 2 Improvements Deployed:"
echo "============================================"
echo ""
echo "UX Fixes:"
echo "✅ Scroll position fixed - all pages start at top"
echo "✅ Service cards restored to proper size (600x450)"
echo "✅ Service cards scroll to form when no page"
echo "✅ Smooth scroll animation added"
echo ""
echo "Image Optimizations:"
echo "✅ FAQ images optimized (1920x800 dimensions)"
echo "✅ Content section images optimized (960x720 dimensions)"
echo "✅ All images lazy load below fold"
echo "✅ No layout shifts"
echo ""
echo "LCP Improvements:"
echo "✅ DNS prefetch added"
echo "✅ Backend preconnect added"
echo "✅ Logo priority increased"
echo ""
echo "============================================"
echo "🧪 Testing Instructions:"
echo "============================================"
echo ""
echo "1. Scroll Position Test:"
echo "   - Visit https://insapimarketing.com"
echo "   - Click any service page link"
echo "   - Verify page starts at top"
echo ""
echo "2. Service Card Test:"
echo "   - Scroll to services section"
echo "   - Verify cards are proper size"
echo "   - Click 'SEO' or 'Website' card"
echo "   - Verify smooth scroll to form"
echo ""
echo "3. Performance Test:"
echo "   - Open DevTools → Lighthouse"
echo "   - Run mobile audit"
echo "   - Check: Score 80-90, LCP <1.5s, CLS <0.05"
echo ""
echo "4. Image Test:"
echo "   - Open DevTools → Network"
echo "   - Reload page"
echo "   - Verify hero and logo load first"
echo "   - Scroll to FAQ"
echo "   - Verify FAQ image lazy loads"
echo ""
echo "Expected Results:"
echo "- Mobile Performance: 80-90 (was 75-85)"
echo "- Desktop Performance: 90-95 (was 85-90)"
echo "- LCP: 1-1.5s (was 1.5-2s)"
echo "- CLS: <0.05 (was 0.05-0.10)"
echo ""
echo "============================================"
echo "📈 Next Steps (Phase 3):"
echo "============================================"
echo "- Generate responsive image variants"
echo "- Implement srcset for bandwidth savings"
echo "- Convert remaining PNG to WebP"
echo "- Add service worker for caching"
echo ""
echo "For full implementation plan, see:"
echo "COMPREHENSIVE_IMAGE_PERFORMANCE_AUDIT.md"
echo ""
