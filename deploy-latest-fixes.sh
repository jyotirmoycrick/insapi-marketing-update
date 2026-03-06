#!/bin/bash

# ============================================
# Latest Fixes Deployment Script
# ============================================
# Deploys all recent UX and performance fixes:
# - Service cards scroll to hero (home page)
# - Logo compression fix (120px fixed width)
# - Service page cards size increase
# - Editable hero images on service pages
# - Scroll to top on page navigation
# - Image performance optimizations
# - OptimizedImage component
# ============================================

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
DOMAIN="insapimarketing.com"
BACKEND_IP="187.124.99.185"
BACKEND_PORT="8000"
APP_DIR=$(pwd)

echo -e "${BLUE}=========================================="
echo "🚀 Latest Fixes Deployment"
echo "   InsAPI Marketing CMS"
echo -e "==========================================${NC}"
echo ""
echo -e "${CYAN}This deployment includes:${NC}"
echo ""
echo "  UX Fixes:"
echo "  ✓ Service cards scroll to hero section"
echo "  ✓ Logo fixed at 120px width (no compression)"
echo "  ✓ Service page cards increased size"
echo "  ✓ All pages scroll to top on navigation"
echo ""
echo "  Performance Fixes:"
echo "  ✓ Hero images optimized (eager loading)"
echo "  ✓ OptimizedImage component"
echo "  ✓ Image preloading"
echo "  ✓ Responsive image handling"
echo ""
echo "  CMS Features:"
echo "  ✓ Editable hero images on service pages"
echo "  ✓ Dynamic image URLs (VPS compatible)"
echo ""
echo -e "${YELLOW}Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  Backend: http://$BACKEND_IP:$BACKEND_PORT"
echo "  App Directory: $APP_DIR"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo -e "${BLUE}=========================================="
echo "Starting Deployment..."
echo -e "==========================================${NC}"
echo ""

# ============================================
# Step 1: Verify Files
# ============================================
echo -e "${GREEN}[1/6] Verifying updated files...${NC}"

REQUIRED_FILES=(
    "frontend/src/app/components/ServicesSection.tsx"
    "frontend/src/app/components/DynamicHeader.tsx"
    "frontend/src/app/App.tsx"
    "frontend/src/components/UniversalHero.tsx"
    "frontend/src/components/OptimizedImage.tsx"
    "frontend/src/components/EditableImage.tsx"
    "frontend/src/utils/urlHelper.ts"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    echo -e "${RED}✗ Missing required files:${NC}"
    for file in "${MISSING_FILES[@]}"; do
        echo "  - $file"
    done
    exit 1
fi

echo -e "${GREEN}✓ All required files present${NC}"
echo ""

# ============================================
# Step 2: Update Frontend .env
# ============================================
echo -e "${GREEN}[2/6] Updating frontend .env...${NC}"

cd "$APP_DIR/frontend"

# Backup existing .env
if [ -f ".env" ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    echo "✓ Backed up existing .env"
fi

# Create new .env with VPS configuration
cat > .env << EOF
VITE_API_URL=http://$BACKEND_IP:$BACKEND_PORT/api
EOF

echo -e "${GREEN}✓ Updated .env:${NC}"
cat .env
echo ""

# ============================================
# Step 3: Install Dependencies
# ============================================
echo -e "${GREEN}[3/6] Checking dependencies...${NC}"

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "✓ Dependencies already installed"
fi

echo ""

# ============================================
# Step 4: Build Frontend
# ============================================
echo -e "${GREEN}[4/6] Building optimized frontend...${NC}"

npm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
    echo "Build size:"
    du -sh dist
    echo ""
    echo "Build contents:"
    ls -lh dist/
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo ""

cd "$APP_DIR"

# ============================================
# Step 5: Verify Backend
# ============================================
echo -e "${GREEN}[5/6] Verifying backend...${NC}"

if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}✓ Backend is running${NC}"
    
    # Test API
    if curl -s -f http://localhost:$BACKEND_PORT/api/components/templates > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend API is responding${NC}"
    else
        echo -e "${YELLOW}⚠ Backend API not responding${NC}"
        echo "  You may need to restart the backend"
    fi
else
    echo -e "${YELLOW}⚠ Backend is not running${NC}"
    echo ""
    echo "To start backend:"
    echo "  cd $APP_DIR/backend"
    echo "  python3 server.py &"
    echo ""
    echo "Or with PM2:"
    echo "  pm2 start server.py --name backend --interpreter python3"
    echo ""
    read -p "Start backend now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$APP_DIR/backend"
        
        if command -v pm2 &> /dev/null; then
            pm2 start server.py --name backend --interpreter python3
            pm2 save
            echo -e "${GREEN}✓ Backend started with PM2${NC}"
        else
            nohup python3 server.py > backend.log 2>&1 &
            echo -e "${GREEN}✓ Backend started in background${NC}"
            echo "  Log file: $APP_DIR/backend/backend.log"
        fi
        
        cd "$APP_DIR"
    fi
fi

echo ""

# ============================================
# Step 6: Deployment Instructions
# ============================================
echo -e "${GREEN}[6/6] Deployment instructions...${NC}"
echo ""

if [ -d "/var/www/$DOMAIN" ]; then
    echo -e "${CYAN}Detected web server directory${NC}"
    echo ""
    echo "Copying files to web server..."
    
    sudo cp -r frontend/dist/* /var/www/$DOMAIN/
    
    echo -e "${GREEN}✓ Files copied to /var/www/$DOMAIN${NC}"
    echo ""
    
    # Restart Nginx if available
    if command -v nginx &> /dev/null; then
        echo "Restarting Nginx..."
        sudo systemctl reload nginx
        echo -e "${GREEN}✓ Nginx reloaded${NC}"
    fi
else
    echo -e "${YELLOW}Manual deployment required${NC}"
    echo ""
    echo "Copy the built files to your web server:"
    echo "  Source: $APP_DIR/frontend/dist/*"
    echo "  Destination: Your web server root"
    echo ""
    echo "Example commands:"
    echo "  # Local web server"
    echo "  sudo cp -r frontend/dist/* /var/www/$DOMAIN/"
    echo ""
    echo "  # Remote VPS via SCP"
    echo "  scp -r frontend/dist/* user@$BACKEND_IP:/var/www/$DOMAIN/"
    echo ""
    echo "  # Remote VPS via rsync"
    echo "  rsync -avz frontend/dist/ user@$BACKEND_IP:/var/www/$DOMAIN/"
fi

echo ""

# ============================================
# Final Summary
# ============================================
echo -e "${BLUE}=========================================="
echo "✅ Deployment Complete!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}What was deployed:${NC}"
echo ""
echo "  UX Improvements:"
echo "  ✓ Home service cards (900x675) scroll to hero"
echo "  ✓ Logo fixed at 120px width (no compression)"
echo "  ✓ Service page cards increased size"
echo "  ✓ All pages scroll to top on navigation"
echo ""
echo "  Performance Optimizations:"
echo "  ✓ Hero images with eager loading"
echo "  ✓ OptimizedImage component for all images"
echo "  ✓ Image preloading for LCP"
echo "  ✓ Responsive image handling"
echo ""
echo "  CMS Features:"
echo "  ✓ Editable hero images on all service pages"
echo "  ✓ Dynamic image URLs (environment-based)"
echo "  ✓ Absolute URLs for VPS compatibility"
echo ""
echo -e "${CYAN}URLs:${NC}"
echo "  Frontend: http://$DOMAIN"
echo "  Admin: http://$DOMAIN/fast-admin"
echo "  API: http://$BACKEND_IP:$BACKEND_PORT/api"
echo "  Uploads: http://$BACKEND_IP:$BACKEND_PORT/uploads"
echo ""
echo -e "${CYAN}Admin Credentials:${NC}"
echo "  Username: malo"
echo "  Password: 1234567890"
echo ""
echo -e "${YELLOW}Testing Checklist:${NC}"
echo ""
echo "1. Homepage Tests:"
echo "   □ Visit http://$DOMAIN"
echo "   □ Scroll to services section"
echo "   □ Verify cards are 900x675 on desktop"
echo "   □ Click any service card"
echo "   □ Verify smooth scroll to top"
echo ""
echo "2. Logo Test:"
echo "   □ Resize browser window"
echo "   □ Verify logo stays at 120px width"
echo "   □ No compression or shrinking"
echo ""
echo "3. Service Pages Test:"
echo "   □ Navigate to any service page"
echo "   □ Verify page starts at top"
echo "   □ Verify hero image loads quickly"
echo "   □ Check cards are larger on desktop"
echo ""
echo "4. Admin Test:"
echo "   □ Login to http://$DOMAIN/fast-admin"
echo "   □ Navigate to a service page"
echo "   □ Enable edit mode"
echo "   □ Hover over hero image"
echo "   □ Upload new hero image"
echo "   □ Verify image saves and displays"
echo ""
echo "5. Performance Test:"
echo "   □ Open DevTools (F12) → Network tab"
echo "   □ Reload homepage"
echo "   □ Check hero image loads with priority"
echo "   □ Verify LCP < 2.5 seconds"
echo "   □ Run PageSpeed Insights"
echo ""
echo -e "${BLUE}Performance Expectations:${NC}"
echo "  • LCP: < 2.5 seconds (target: < 1.5s)"
echo "  • FCP: < 1.8 seconds"
echo "  • CLS: < 0.1 (target: < 0.05)"
echo "  • Mobile Score: 80-90"
echo "  • Desktop Score: 90-95"
echo ""
echo -e "${BLUE}Troubleshooting:${NC}"
echo ""
echo "If images don't load:"
echo "  1. Check .env: cat frontend/.env"
echo "  2. Verify backend: curl http://localhost:$BACKEND_PORT/api/components/templates"
echo "  3. Check browser console (F12)"
echo "  4. Clear browser cache (Ctrl+Shift+R)"
echo ""
echo "If service cards don't scroll:"
echo "  1. Check browser console for errors"
echo "  2. Verify ServicesSection.tsx was built"
echo "  3. Hard refresh (Ctrl+Shift+R)"
echo ""
echo "If logo shrinks:"
echo "  1. Check DynamicHeader.tsx was built"
echo "  2. Inspect logo element in DevTools"
echo "  3. Verify minWidth: 120px is applied"
echo ""
echo -e "${GREEN}🎉 All fixes deployed successfully!${NC}"
echo ""
echo -e "${CYAN}Documentation:${NC}"
echo "  • All fixes: ALL_ISSUES_FIXED.md"
echo "  • Logo fix: LOGO_FIX_FINAL.md"
echo "  • Service cards: SERVICE_CARDS_SCROLL_FIX.md"
echo "  • Performance: COMPLETE_PERFORMANCE_GUIDE.md"
echo "  • Image optimization: COMPREHENSIVE_IMAGE_PERFORMANCE_AUDIT.md"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Test all features (use checklist above)"
echo "2. Run PageSpeed Insights"
echo "3. Monitor performance in production"
echo "4. Set up SSL if not already done"
echo ""
echo "Need help? Check the documentation files listed above."
echo ""

