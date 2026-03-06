# VPS Deployment Guide - Complete Setup

## Overview

This guide will help you deploy your React + FastAPI + MongoDB application to a VPS (Virtual Private Server).

## Prerequisites

### What You Need:
1. **VPS Server** (Ubuntu 20.04/22.04 recommended)
   - Minimum: 2GB RAM, 2 CPU cores, 20GB storage
   - Recommended: 4GB RAM, 2 CPU cores, 40GB storage
   - Providers: DigitalOcean, Linode, Vultr, AWS EC2, etc.

2. **Domain Name** (optional but recommended)
   - Example: yourdomain.com
   - Point A record to your VPS IP

3. **SSH Access** to your VPS
   - Username (usually `root` or `ubuntu`)
   - Password or SSH key

## Architecture

```
┌─────────────────────────────────────────┐
│           Your Domain                    │
│        (yourdomain.com)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Nginx (Reverse Proxy)           │
│  - Port 80 (HTTP) → 443 (HTTPS)        │
│  - SSL Certificate (Let's Encrypt)      │
└──────────┬──────────────────────────────┘
           │
           ├─────────────────┬─────────────┐
           ▼                 ▼             ▼
    ┌──────────┐      ┌──────────┐  ┌──────────┐
    │ Frontend │      │ Backend  │  │ MongoDB  │
    │  (Vite)  │      │ (FastAPI)│  │ Database │
    │ Port 5173│      │ Port 8000│  │ Port 27017│
    └──────────┘      └──────────┘  └──────────┘
```

## Step-by-Step Deployment

### Step 1: Connect to Your VPS

```bash
# Replace with your VPS IP address
ssh root@YOUR_VPS_IP

# Or if using a different user
ssh ubuntu@YOUR_VPS_IP
```

### Step 2: Update System

```bash
# Update package list
sudo apt update

# Upgrade packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

### Step 3: Install Node.js

```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Step 4: Install Python

```bash
# Install Python 3.10+
sudo apt install -y python3 python3-pip python3-venv

# Verify installation
python3 --version  # Should show 3.10 or higher
pip3 --version
```

### Step 5: Install MongoDB

```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

### Step 6: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 7: Setup Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

### Step 8: Upload Your Code

**Option A: Using Git (Recommended)**

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/yourusername/yourrepo.git myapp

# Or if private repo
sudo git clone https://YOUR_TOKEN@github.com/yourusername/yourrepo.git myapp

# Set permissions
sudo chown -R $USER:$USER /var/www/myapp
```

**Option B: Using SCP/SFTP**

```bash
# From your local machine
# Zip your project first
zip -r myapp.zip . -x "node_modules/*" -x "frontend/node_modules/*" -x "backend/__pycache__/*" -x ".git/*"

# Upload to VPS
scp myapp.zip root@YOUR_VPS_IP:/var/www/

# On VPS, extract
cd /var/www
unzip myapp.zip -d myapp
```

### Step 9: Setup Backend

```bash
cd /var/www/myapp/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
nano .env
```

**Backend .env file**:
```env
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=insapi_db
JWT_SECRET=your-super-secret-jwt-key-change-this
ADMIN_USERNAME=malo
ADMIN_PASSWORD=1234567890
CORS_ORIGINS=["http://yourdomain.com", "https://yourdomain.com"]
```

### Step 10: Setup Frontend

```bash
cd /var/www/myapp/frontend

# Install dependencies
npm install

# Create .env file
nano .env
```

**Frontend .env file**:
```env
VITE_API_URL=https://yourdomain.com/api
```

**Build frontend**:
```bash
npm run build
```

This creates a `dist` folder with production files.

### Step 11: Setup PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start backend with PM2
cd /var/www/myapp/backend
pm2 start "venv/bin/python server.py" --name backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it gives you (usually starts with sudo)

# Check status
pm2 status
pm2 logs backend
```

### Step 12: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/myapp
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (React build)
    location / {
        root /var/www/myapp/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeouts for uploads
        client_max_body_size 50M;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }

    # Uploaded files
    location /uploads {
        alias /var/www/myapp/backend/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

**Enable the site**:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 13: Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 14: Initialize Database

```bash
# Connect to MongoDB
mongosh

# Create database and user
use insapi_db

# Create admin user (optional, for security)
db.createUser({
  user: "insapi_admin",
  pwd: "your-secure-password",
  roles: [{ role: "readWrite", db: "insapi_db" }]
})

# Exit
exit
```

**Update backend .env with MongoDB credentials** (if you created a user):
```env
MONGODB_URI=mongodb://insapi_admin:your-secure-password@localhost:27017/
```

### Step 15: Create Upload Directory

```bash
# Create uploads directory
mkdir -p /var/www/myapp/backend/uploads

# Set permissions
chmod 755 /var/www/myapp/backend/uploads
chown -R www-data:www-data /var/www/myapp/backend/uploads
```

### Step 16: Restart Services

```bash
# Restart backend
pm2 restart backend

# Restart Nginx
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx
```

## Verification

### Check if Everything is Running

```bash
# Check backend
curl http://localhost:8000/api/pages

# Check Nginx
curl http://localhost

# Check from outside
curl https://yourdomain.com
```

### Access Your Site

1. **Frontend**: https://yourdomain.com
2. **Admin Panel**: https://yourdomain.com/admin
3. **API**: https://yourdomain.com/api

## Maintenance Commands

### View Logs

```bash
# Backend logs
pm2 logs backend

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Restart Services

```bash
# Restart backend
pm2 restart backend

# Restart Nginx
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod
```

### Update Code

```bash
# Pull latest code
cd /var/www/myapp
git pull

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo systemctl reload nginx
```

### Backup Database

```bash
# Create backup
mongodump --db insapi_db --out /var/backups/mongodb/$(date +%Y%m%d)

# Restore backup
mongorestore --db insapi_db /var/backups/mongodb/20240101/insapi_db
```

## Security Best Practices

### 1. Change Default Passwords

```bash
# Change admin password in backend/.env
nano /var/www/myapp/backend/.env
# Update ADMIN_PASSWORD

# Restart backend
pm2 restart backend
```

### 2. Setup MongoDB Authentication

```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf

# Add security section:
security:
  authorization: enabled

# Restart MongoDB
sudo systemctl restart mongod
```

### 3. Setup Fail2Ban (Prevent Brute Force)

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# Enable for SSH and Nginx
# Restart
sudo systemctl restart fail2ban
```

### 4. Regular Updates

```bash
# Create update script
nano /root/update.sh
```

```bash
#!/bin/bash
apt update
apt upgrade -y
apt autoremove -y
```

```bash
chmod +x /root/update.sh

# Add to crontab (weekly updates)
crontab -e
# Add: 0 2 * * 0 /root/update.sh
```

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs backend

# Check if port 8000 is in use
sudo lsof -i :8000

# Restart
pm2 restart backend
```

### Frontend Not Loading

```bash
# Check Nginx config
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Rebuild frontend
cd /var/www/myapp/frontend
npm run build
```

### MongoDB Connection Issues

```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongod
```

### SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates
```

## Performance Optimization

### 1. Enable Gzip Compression

```bash
sudo nano /etc/nginx/nginx.conf
```

Add in `http` block:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. Setup Redis Cache (Optional)

```bash
# Install Redis
sudo apt install -y redis-server

# Start Redis
sudo systemctl start redis
sudo systemctl enable redis
```

### 3. Monitor Resources

```bash
# Install htop
sudo apt install -y htop

# Monitor
htop

# Check disk space
df -h

# Check memory
free -h
```

## Cost Estimate

### VPS Providers (Monthly):
- **DigitalOcean**: $12-24/month (2-4GB RAM)
- **Linode**: $12-24/month (2-4GB RAM)
- **Vultr**: $12-24/month (2-4GB RAM)
- **AWS EC2**: $15-30/month (t3.small-medium)

### Domain Name:
- $10-15/year (.com domain)

### SSL Certificate:
- **Free** (Let's Encrypt)

**Total**: ~$15-30/month

## Quick Deployment Script

Save this as `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest code
cd /var/www/myapp
git pull

# Update backend
echo "📦 Updating backend..."
cd backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart backend

# Update frontend
echo "🎨 Building frontend..."
cd ../frontend
npm install
npm run build

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment complete!"
pm2 status
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

## Summary

✅ VPS setup complete
✅ Node.js, Python, MongoDB installed
✅ Nginx configured as reverse proxy
✅ SSL certificate installed
✅ PM2 managing backend process
✅ Frontend built and served
✅ Security configured
✅ Monitoring setup

Your site is now live at **https://yourdomain.com**!

---

**Need help?** Check logs with `pm2 logs backend` and `sudo tail -f /var/log/nginx/error.log`
