#!/bin/bash

# Deploy Image URL Fix Script
# This script deploys the dynamic image URL fix to your VPS

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Deploying Dynamic Image URL Fix"
echo -e "==========================================${NC}"
echo ""

# Configuration
BACKEND_IP="187.124.99.185"
BACKEND_PORT="8000"
API_URL="http://$BACKEND_IP:$BACKEND_PORT/api"

echo -e "${YELLOW}Configuration:${NC}"
echo "  Backend API: $API_URL"
echo ""

# Step 1: Check if urlHelper.ts exists
echo -e "${GREEN}[1/4] Checking URL helper utility...${NC}"
if [ -f "frontend/src/utils/urlHelper.ts" ]; then
    echo -e "${GREEN}✓ urlHelper.ts exists${NC}"
else
    echo -e "${RED}✗ urlHelper.ts not found${NC}"
    echo "Creating urlHelper.ts..."
    mkdir -p frontend/src/utils
    
    cat > frontend/src/utils/urlHelper.ts << 'EOF'
/**
 * URL Helper Utilities
 * Handles conversion of relative upload URLs to absolute URLs
 */

/**
 * Get the base URL for the API server
 * Removes /api suffix if present
 */
export function getApiBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  return apiUrl.replace(/\/api\/?$/, '');
}

/**
 * Convert relative upload URL to absolute URL
 */
export function getAbsoluteUploadUrl(url: string): string {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.startsWith('/uploads/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}${url}`;
  }
  
  if (!url.startsWith('/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/uploads/${url}`;
  }
  
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${url}`;
}

/**
 * Extract filename from upload URL
 */
export function getUploadFilename(url: string): string {
  if (!url) return '';
  const parts = url.split('/');
  return parts[parts.length - 1];
}

/**
 * Check if URL is an upload URL
 */
export function isUploadUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('/uploads/');
}
EOF
    
    echo -e "${GREEN}✓ Created urlHelper.ts${NC}"
fi
echo ""

# Step 2: Update .env
echo -e "${GREEN}[2/4] Updating frontend .env...${NC}"
cd frontend

if [ -f ".env" ]; then
    echo "Backing up existing .env to .env.backup"
    cp .env .env.backup
fi

cat > .env << EOF
VITE_API_URL=$API_URL
EOF

echo -e "${GREEN}✓ Updated .env${NC}"
cat .env
echo ""

# Step 3: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Step 4: Build frontend
echo -e "${GREEN}[3/4] Building frontend...${NC}"
npm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
    echo "Build size:"
    du -sh dist
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

cd ..

# Step 5: Verify backend
echo -e "${GREEN}[4/4] Verifying backend...${NC}"

if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}✓ Backend is running${NC}"
    
    # Test upload endpoint
    if curl -s -f http://localhost:$BACKEND_PORT/api/components/templates > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend API is responding${NC}"
    else
        echo -e "${YELLOW}⚠ Backend API not responding${NC}"
        echo "You may need to restart the backend"
    fi
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
echo "  ✓ URL helper utility (urlHelper.ts)"
echo "  ✓ Updated .env with API URL"
echo "  ✓ Rebuilt frontend with new configuration"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Restart Nginx: sudo systemctl restart nginx"
echo "2. Clear browser cache (Ctrl+Shift+R)"
echo "3. Test image upload in admin panel"
echo ""
echo -e "${YELLOW}Testing:${NC}"
echo "1. Go to: http://insapimarketing.com/fast-admin"
echo "2. Login with: malo / 1234567890"
echo "3. Upload an image"
echo "4. Check browser Network tab:"
echo "   - Upload response: /uploads/filename.webp"
echo "   - Image request: http://$BACKEND_IP:$BACKEND_PORT/uploads/filename.webp"
echo ""
echo -e "${BLUE}For production with SSL, see: DYNAMIC_IMAGE_URL_FIX.md${NC}"
echo ""
