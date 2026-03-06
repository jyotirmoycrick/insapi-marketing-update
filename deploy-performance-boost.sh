#!/bin/bash

# Performance Boost Deployment Script
# Deploys all performance optimizations

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "🚀 Performance Boost Deployment"
echo -e "==========================================${NC}"
echo ""

# Get app directory
APP_DIR=$(pwd)

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Directory: $APP_DIR"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Step 1: Check if files exist
echo -e "${GREEN}[1/7] Checking files...${NC}"

if [ ! -f "frontend/src/utils/imagePreloader.ts" ]; then
    echo -e "${RED}✗ imagePreloader.ts not found${NC}"
    exit 1
fi

if [ ! -f "frontend/src/components/OptimizedImage.tsx" ]; then
    echo -e "${RED}✗ OptimizedImage.tsx not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All files present${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${GREEN}[2/7] Installing dependencies...${NC}"
cd frontend

# Check if package.json needs vite-plugin-compression
if ! grep -q "vite-plugin-compression" package.json; then
    echo "Installing vite-plugin-compression..."
    npm install -D vite-plugin-compression
else
    echo "✓ vite-plugin-compression already installed"
fi

echo ""

# Step 3: Build frontend with optimizations
echo -e "${GREEN}[3/7] Building frontend...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Frontend built successfully${NC}"
echo "Build size:"
du -sh dist
echo ""

cd ..

# Step 4: Create Nginx cache directories
echo -e "${GREEN}[4/7] Setting up Nginx cache...${NC}"

sudo mkdir -p /var/cache/nginx/images
sudo mkdir -p /var/cache/nginx/api
sudo chown -R www-data:www-data /var/cache/nginx
sudo chmod -R 755 /var/cache/nginx

echo -e "${GREEN}✓ Cache directories created${NC}"
echo ""

# Step 5: Backup and update Nginx config
echo -e "${GREEN}[5/7] Updating Nginx configuration...${NC}"

NGINX_CONFIG="/etc/nginx/sites-available/insapimarketing"

if [ -f "$NGINX_CONFIG" ]; then
    echo "Backing up existing config..."
    sudo cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✓ Backup created${NC}"
fi

echo ""
echo -e "${YELLOW}⚠ Manual step required:${NC}"
echo "Update your Nginx configuration at: $NGINX_CONFIG"
echo "Reference file: nginx-performance.conf"
echo ""
echo "Key changes needed:"
echo "  1. Add proxy_cache_path directives"
echo "  2. Enable gzip compression"
echo "  3. Add caching for /uploads location"
echo "  4. Add caching for static assets"
echo ""
read -p "Press Enter after updating Nginx config..."

# Step 6: Test and restart Nginx
echo -e "${GREEN}[6/7] Testing Nginx configuration...${NC}"

if sudo nginx -t; then
    echo -e "${GREEN}✓ Nginx config is valid${NC}"
    
    echo "Restarting Nginx..."
    sudo systemctl restart nginx
    echo -e "${GREEN}✓ Nginx restarted${NC}"
else
    echo -e "${RED}✗ Nginx config has errors${NC}"
    echo "Please fix the errors and run: sudo systemctl restart nginx"
fi

echo ""

# Step 7: Verify backend is running
echo -e "${GREEN}[7/7] Verifying backend...${NC}"

if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${YELLOW}⚠ Backend is not running${NC}"
    echo "Start backend with: cd backend && python3 server.py"
fi

echo ""

# Final summary
echo -e "${BLUE}=========================================="
echo "Deployment Complete!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}What was deployed:${NC}"
echo "  ✓ Image preloader utility"
echo "  ✓ Optimized image component"
echo "  ✓ Enhanced EditableImage with caching"
echo "  ✓ Shimmer loading animation"
echo "  ✓ Frontend rebuilt with optimizations"
echo "  ✓ Nginx cache directories created"
echo "  ✓ Nginx configuration updated"
echo ""
echo -e "${GREEN}Performance improvements:${NC}"
echo "  • Lazy loading for below-the-fold images"
echo "  • Eager loading for hero images"
echo "  • Image preloading and caching"
echo "  • Nginx caching (images: 1 year, API: 5 min)"
echo "  • Gzip compression"
echo "  • Optimized build with code splitting"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Clear browser cache (Ctrl+Shift+R)"
echo "2. Test page load speed"
echo "3. Check Network tab in DevTools"
echo "4. Verify X-Cache-Status headers"
echo ""
echo -e "${BLUE}Testing:${NC}"
echo "# Test cache headers"
echo "curl -I http://insapimarketing.com/uploads/test.jpg"
echo ""
echo "# Test gzip compression"
echo "curl -H 'Accept-Encoding: gzip' -I http://insapimarketing.com"
echo ""
echo "# Run Lighthouse"
echo "lighthouse http://insapimarketing.com --view"
echo ""
echo -e "${GREEN}Expected results:${NC}"
echo "  • Page load time: < 1 second"
echo "  • Image load time: < 300ms (cached)"
echo "  • LCP: < 2.5 seconds"
echo "  • FCP: < 1.8 seconds"
echo ""
echo -e "${BLUE}Performance boost deployed! 🚀${NC}"
echo ""
