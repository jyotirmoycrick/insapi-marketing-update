#!/bin/bash

# ============================================
# Final UX Fixes Deployment
# ============================================
# This script deploys all final UX fixes:
# - Logo shrinking fix
# - Home service cards scroll to top
# - Service cards size increase (desktop)
# - Service pages scroll to top

set -e

echo "🚀 Deploying Final UX Fixes..."
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

echo "Uploading files to VPS..."

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
echo "📊 UX Fixes Deployed:"
echo "============================================"
echo ""
echo "✅ Logo shrinking fixed"
echo "   - Added flex-shrink-0"
echo "   - Added minWidth: 120px"
echo "   - Logo maintains size on all screens"
echo ""
echo "✅ Home service cards scroll to top"
echo "   - SEO card → Scroll to hero"
echo "   - Website card → Scroll to hero"
echo "   - Other cards → Navigate to pages"
echo ""
echo "✅ Service cards size increased (desktop)"
echo "   - Changed from 400x300 to 800x600"
echo "   - Better visual presence"
echo "   - Enhanced hover effects"
echo ""
echo "✅ Service pages scroll to top"
echo "   - All pages start at top"
echo "   - No more middle-page landing"
echo "   - Clear navigation flow"
echo ""
echo "============================================"
echo "🧪 Testing Instructions:"
echo "============================================"
echo ""
echo "1. Logo Test:"
echo "   - Visit https://insapimarketing.com"
echo "   - Resize browser window"
echo "   - Verify logo doesn't shrink"
echo ""
echo "2. Service Cards Test:"
echo "   - Scroll to services section"
echo "   - Verify cards are large on desktop"
echo "   - Click SEO card"
echo "   - Verify smooth scroll to top"
echo ""
echo "3. Page Navigation Test:"
echo "   - Click any service page"
echo "   - Verify page starts at top"
echo "   - Test all service pages"
echo ""
echo "Expected Results:"
echo "- Logo: Maintains 120px minimum width"
echo "- Cards: 800x600 on desktop"
echo "- Navigation: All pages start at top"
echo "- Scroll: Smooth animations"
echo ""
echo "For full details, see:"
echo "FINAL_UX_FIXES_COMPLETE.md"
echo ""
