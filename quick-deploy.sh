#!/bin/bash

# Quick VPS Deployment Script
# Run this on your VPS after initial setup

set -e  # Exit on error

echo "🚀 Starting VPS Deployment..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Get user input
read -p "Enter your domain name (e.g., example.com): " DOMAIN
read -p "Enter your email for SSL certificate: " EMAIL
read -p "Enter GitHub repository URL (or press Enter to skip): " REPO_URL

APP_DIR="/var/www/myapp"

# Step 1: Update system
print_info "Updating system packages..."
apt update && apt upgrade -y
print_success "System updated"

# Step 2: Install Node.js
print_info "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
    print_success "Node.js installed: $(node --version)"
else
    print_success "Node.js already installed: $(node --version)"
fi

# Step 3: Install Python
print_info "Installing Python..."
apt install -y python3 python3-pip python3-venv
print_success "Python installed: $(python3 --version)"

# Step 4: Install MongoDB
print_info "Installing MongoDB..."
if ! command -v mongod &> /dev/null; then
    curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    apt update
    apt install -y mongodb-org
    systemctl start mongod
    systemctl enable mongod
    print_success "MongoDB installed and started"
else
    print_success "MongoDB already installed"
fi

# Step 5: Install Nginx
print_info "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
    print_success "Nginx installed and started"
else
    print_success "Nginx already installed"
fi

# Step 6: Install PM2
print_info "Installing PM2..."
npm install -g pm2
print_success "PM2 installed"

# Step 7: Setup firewall
print_info "Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
echo "y" | ufw enable
print_success "Firewall configured"

# Step 8: Clone or setup code
if [ ! -z "$REPO_URL" ]; then
    print_info "Cloning repository..."
    if [ -d "$APP_DIR" ]; then
        print_info "Directory exists, pulling latest code..."
        cd $APP_DIR
        git pull
    else
        git clone $REPO_URL $APP_DIR
    fi
    print_success "Code deployed"
else
    print_info "Skipping repository clone. Please upload your code to $APP_DIR"
fi

# Step 9: Setup backend
if [ -d "$APP_DIR/backend" ]; then
    print_info "Setting up backend..."
    cd $APP_DIR/backend
    
    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate
    
    # Install dependencies
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
        print_success "Backend dependencies installed"
    fi
    
    # Create .env if doesn't exist
    if [ ! -f ".env" ]; then
        cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=insapi_db
JWT_SECRET=$(openssl rand -hex 32)
ADMIN_USERNAME=malo
ADMIN_PASSWORD=1234567890
CORS_ORIGINS=["http://$DOMAIN", "https://$DOMAIN"]
EOF
        print_success "Backend .env created"
    fi
    
    # Start with PM2
    pm2 delete backend 2>/dev/null || true
    pm2 start "venv/bin/python server.py" --name backend
    pm2 save
    pm2 startup | tail -n 1 | bash
    print_success "Backend started with PM2"
fi

# Step 10: Setup frontend
if [ -d "$APP_DIR/frontend" ]; then
    print_info "Setting up frontend..."
    cd $APP_DIR/frontend
    
    # Create .env
    cat > .env << EOF
VITE_API_URL=https://$DOMAIN/api
EOF
    
    # Install and build
    npm install
    npm run build
    print_success "Frontend built"
fi

# Step 11: Create uploads directory
print_info "Creating uploads directory..."
mkdir -p $APP_DIR/backend/uploads
chmod 755 $APP_DIR/backend/uploads
chown -R www-data:www-data $APP_DIR/backend/uploads
print_success "Uploads directory created"

# Step 12: Configure Nginx
print_info "Configuring Nginx..."
cat > /etc/nginx/sites-available/myapp << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        root $APP_DIR/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        client_max_body_size 50M;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }

    location /uploads {
        alias $APP_DIR/backend/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOF

ln -sf /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
print_success "Nginx configured"

# Step 13: Setup SSL
print_info "Setting up SSL certificate..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL --redirect
print_success "SSL certificate installed"

# Step 14: Final checks
print_info "Running final checks..."
systemctl status nginx --no-pager
pm2 status
systemctl status mongod --no-pager

echo ""
echo "================================"
print_success "Deployment Complete!"
echo "================================"
echo ""
echo "Your site is now live at:"
echo "  🌐 https://$DOMAIN"
echo "  🔐 Admin: https://$DOMAIN/admin"
echo ""
echo "Next steps:"
echo "  1. Visit your site and test functionality"
echo "  2. Login to admin panel (username: malo, password: 1234567890)"
echo "  3. Change admin password in $APP_DIR/backend/.env"
echo "  4. Restart backend: pm2 restart backend"
echo ""
echo "Useful commands:"
echo "  pm2 logs backend          - View backend logs"
echo "  pm2 restart backend       - Restart backend"
echo "  systemctl reload nginx    - Reload Nginx"
echo "  certbot renew            - Renew SSL certificate"
echo ""
print_success "Happy deploying! 🚀"
