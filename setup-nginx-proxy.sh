#!/bin/bash

# Nginx Proxy Setup Script
# Sets up Nginx to proxy uploads through the same domain

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "🔧 Nginx Proxy Setup for Images"
echo -e "==========================================${NC}"
echo ""

# Configuration
DOMAIN="insapimarketing.com"
APP_DIR=$(pwd)
NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"

echo -e "${YELLOW}Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  App Directory: $APP_DIR"
echo "  Nginx Config: $NGINX_CONFIG"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Step 1: Backup Nginx config
echo -e "${GREEN}[1/5] Backing up Nginx config...${NC}"

if [ -f "$NGINX_CONFIG" ]; then
    BACKUP_FILE="$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    sudo cp "$NGINX_CONFIG" "$BACKUP_FILE"
    echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
else
    echo -e "${YELLOW}⚠ Nginx config not found at $NGINX_CONFIG${NC}"
    echo "Will create new config"
fi

echo ""

# Step 2: Update frontend .env
echo -e "${GREEN}[2/5] Updating frontend .env...${NC}"

cd "$APP_DIR/frontend"

# Backup existing .env
if [ -f ".env" ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
fi

# Create new .env
cat > .env << EOF
VITE_API_URL=https://$DOMAIN/api
EOF

echo -e "${GREEN}✓ Updated .env${NC}"
cat .env
echo ""

# Step 3: Rebuild frontend
echo -e "${GREEN}[3/5] Rebuilding frontend...${NC}"

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

cd "$APP_DIR"

# Step 4: Update Nginx config
echo -e "${GREEN}[4/5] Updating Nginx configuration...${NC}"

echo ""
echo -e "${YELLOW}⚠ Manual step required:${NC}"
echo "Add this to your Nginx config at: $NGINX_CONFIG"
echo ""
echo -e "${BLUE}Add this location block:${NC}"
cat << 'EOF'

    # Proxy uploads through same domain
    location /uploads {
        proxy_pass http://localhost:8000/uploads;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        
        # Caching
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        
        # Performance
        expires 1y;
        access_log off;
    }

EOF
echo ""
read -p "Press Enter after updating Nginx config..."

# Step 5: Test and restart Nginx
echo -e "${GREEN}[5/5] Testing and restarting Nginx...${NC}"

if sudo nginx -t; then
    echo -e "${GREEN}✓ Nginx config is valid${NC}"
    
    echo "Restarting Nginx..."
    sudo systemctl restart nginx
    echo -e "${GREEN}✓ Nginx restarted${NC}"
else
    echo -e "${RED}✗ Nginx config has errors${NC}"
    echo "Please fix the errors and run: sudo systemctl restart nginx"
    exit 1
fi

echo ""

# Final summary
echo -e "${BLUE}=========================================="
echo "Setup Complete!"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}What was configured:${NC}"
echo "  ✓ Frontend .env updated to use domain"
echo "  ✓ Frontend rebuilt with new config"
echo "  ✓ Nginx configured to proxy /uploads"
echo "  ✓ Nginx restarted"
echo ""
echo -e "${GREEN}Image URLs now work as:${NC}"
echo "  Development: http://localhost:8000/uploads/image.png"
echo "  Production: https://$DOMAIN/uploads/image.png"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Set up SSL (if not already done):"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "2. Test image upload:"
echo "   - Go to admin panel"
echo "   - Upload an image"
echo "   - Verify URL is: https://$DOMAIN/uploads/..."
echo ""
echo "3. Clear browser cache:"
echo "   - Press Ctrl+Shift+R"
echo ""
echo -e "${BLUE}Testing:${NC}"
echo "# Test uploads proxy"
echo "curl -I https://$DOMAIN/uploads/test.jpg"
echo ""
echo "# Should see:"
echo "# HTTP/2 200"
echo "# cache-control: public, max-age=31536000, immutable"
echo ""
echo -e "${GREEN}Images now automatically use your domain! 🎉${NC}"
echo ""
