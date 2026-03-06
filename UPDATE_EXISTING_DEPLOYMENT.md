# Update Existing Deployment - Safe Upgrade Guide

## Overview

This guide helps you update an existing deployed site to the new version while preserving:
- ✅ Database data (pages, content, users)
- ✅ Uploaded images
- ✅ Configuration files
- ✅ SSL certificates

## Before You Start

### 1. Backup Everything

```bash
# Connect to your VPS
ssh root@YOUR_VPS_IP

# Create backup directory
mkdir -p ~/backups/$(date +%Y%m%d)

# Backup database
mongodump --db insapi_db --out ~/backups/$(date +%Y%m%d)/mongodb

# Backup uploaded files
cp -r /var/www/myapp/backend/uploads ~/backups/$(date +%Y%m%d)/uploads

# Backup .env files
cp /var/www/myapp/backend/.env ~/backups/$(date +%Y%m%d)/backend.env
cp /var/www/myapp/frontend/.env ~/backups/$(date +%Y%m%d)/frontend.env

# Backup Nginx config
cp /etc/nginx/sites-available/myapp ~/backups/$(date +%Y%m%d)/nginx.conf
```

### 2. Check Current Status

```bash
# Check what's running
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod

# Note your current versions
cd /var/www/myapp
git log -1  # If using git
```

## Update Methods

### Method 1: Git Pull (Recommended if using Git)

```bash
# Navigate to app directory
cd /var/www/myapp

# Stop backend temporarily
pm2 stop backend

# Stash any local changes
git stash

# Pull latest code
git pull origin main  # or master, depending on your branch

# If you had local changes, review them
git stash list
# git stash pop  # Only if you want to restore local changes
```

### Method 2: Upload New Code (If not using Git)

```bash
# On your local machine, create a zip WITHOUT these folders:
# - node_modules
# - frontend/node_modules
# - frontend/dist
# - backend/venv
# - backend/__pycache__
# - backend/uploads (important!)
# - backend/.env (important!)
# - frontend/.env (important!)

# Zip the code
zip -r myapp-update.zip . \
  -x "node_modules/*" \
  -x "frontend/node_modules/*" \
  -x "frontend/dist/*" \
  -x "backend/venv/*" \
  -x "backend/__pycache__/*" \
  -x "backend/uploads/*" \
  -x "backend/.env" \
  -x "frontend/.env" \
  -x ".git/*"

# Upload to VPS
scp myapp-update.zip root@YOUR_VPS_IP:/tmp/

# On VPS, extract to temporary location
cd /tmp
unzip myapp-update.zip -d myapp-new

# Stop backend
pm2 stop backend

# Backup old code (just in case)
mv /var/www/myapp /var/www/myapp-old

# Move new code
mv /tmp/myapp-new /var/www/myapp

# Restore important files
cp /var/www/myapp-old/backend/.env /var/www/myapp/backend/.env
cp /var/www/myapp-old/frontend/.env /var/www/myapp/frontend/.env
cp -r /var/www/myapp-old/backend/uploads /var/www/myapp/backend/
```

## Step-by-Step Update Process

### Step 1: Update Backend

```bash
cd /var/www/myapp/backend

# Activate virtual environment
source venv/bin/activate

# Update dependencies
pip install -r requirements.txt --upgrade

# Check if .env needs updates
nano .env
```

**Check if your .env has these new fields** (add if missing):
```env
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=insapi_db
JWT_SECRET=your-existing-secret
ADMIN_USERNAME=malo
ADMIN_PASSWORD=your-existing-password
CORS_ORIGINS=["http://yourdomain.com", "https://yourdomain.com"]
```

### Step 2: Update Frontend

```bash
cd /var/www/myapp/frontend

# Check .env file
nano .env
```

**Make sure it has**:
```env
VITE_API_URL=https://yourdomain.com/api
```

```bash
# Install dependencies
npm install

# Build new version
npm run build
```

### Step 3: Update Database Schema (if needed)

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use insapi_db

# Check existing collections
show collections

# If you need to add new fields to existing documents, run updates
# Example: Add unit fields to component styles
db.pages.updateMany(
  {},
  {
    $set: {
      "components.$[].styles.widthUnit": "px",
      "components.$[].styles.heightUnit": "px"
    }
  }
)

# Exit
exit
```

### Step 4: Restart Services

```bash
# Restart backend
pm2 restart backend

# Check logs for errors
pm2 logs backend --lines 50

# If no errors, reload Nginx
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx
```

### Step 5: Verify Update

```bash
# Test backend API
curl http://localhost:8000/api/pages

# Test frontend
curl http://localhost

# Check from browser
# Visit: https://yourdomain.com
```

## Rollback Plan (If Something Goes Wrong)

### Quick Rollback

```bash
# Stop current backend
pm2 stop backend

# Restore old code
rm -rf /var/www/myapp
mv /var/www/myapp-old /var/www/myapp

# Restart backend
cd /var/www/myapp/backend
source venv/bin/activate
pm2 restart backend

# Rebuild frontend (if needed)
cd /var/www/myapp/frontend
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

### Restore Database (If Needed)

```bash
# Restore from backup
mongorestore --db insapi_db --drop ~/backups/YYYYMMDD/mongodb/insapi_db
```

### Restore Uploads (If Needed)

```bash
# Restore uploaded files
rm -rf /var/www/myapp/backend/uploads
cp -r ~/backups/YYYYMMDD/uploads /var/www/myapp/backend/uploads
chown -R www-data:www-data /var/www/myapp/backend/uploads
```

## Common Issues & Solutions

### Issue 1: Backend Won't Start

```bash
# Check logs
pm2 logs backend

# Common causes:
# 1. Missing dependencies
cd /var/www/myapp/backend
source venv/bin/activate
pip install -r requirements.txt

# 2. Port already in use
sudo lsof -i :8000
# Kill the process if needed
sudo kill -9 PID

# 3. Python path issues
pm2 delete backend
pm2 start "venv/bin/python server.py" --name backend
```

### Issue 2: Frontend Not Loading

```bash
# Rebuild frontend
cd /var/www/myapp/frontend
npm install
npm run build

# Check Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Issue 3: Database Connection Error

```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string in .env
cat /var/www/myapp/backend/.env | grep MONGODB_URI

# Test connection
mongosh
```

### Issue 4: Uploads Not Working

```bash
# Check uploads directory exists
ls -la /var/www/myapp/backend/uploads

# Fix permissions
sudo chown -R www-data:www-data /var/www/myapp/backend/uploads
sudo chmod -R 755 /var/www/myapp/backend/uploads
```

### Issue 5: SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew if needed
sudo certbot renew

# Restart Nginx
sudo systemctl restart nginx
```

## Zero-Downtime Update (Advanced)

For minimal downtime, use this approach:

```bash
# 1. Clone to new directory
cd /var/www
git clone YOUR_REPO myapp-new

# 2. Setup new version
cd myapp-new/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp /var/www/myapp/backend/.env .env

cd ../frontend
npm install
cp /var/www/myapp/frontend/.env .env
npm run build

# 3. Copy uploads
cp -r /var/www/myapp/backend/uploads /var/www/myapp-new/backend/

# 4. Start new backend on different port temporarily
cd /var/www/myapp-new/backend
source venv/bin/activate
pm2 start "venv/bin/python server.py" --name backend-new -- --port 8001

# 5. Update Nginx to point to new backend
sudo nano /etc/nginx/sites-available/myapp
# Change proxy_pass to http://localhost:8001

# 6. Test
curl http://localhost:8001/api/pages

# 7. Reload Nginx
sudo nginx -t
sudo systemctl reload nginx

# 8. Stop old backend
pm2 stop backend
pm2 delete backend

# 9. Rename new backend
pm2 delete backend-new
cd /var/www/myapp-new/backend
pm2 start "venv/bin/python server.py" --name backend

# 10. Update Nginx back to port 8000
sudo nano /etc/nginx/sites-available/myapp
# Change proxy_pass back to http://localhost:8000
sudo systemctl reload nginx

# 11. Swap directories
cd /var/www
mv myapp myapp-old-backup
mv myapp-new myapp

# 12. Clean up after testing
rm -rf /var/www/myapp-old-backup
```

## Update Checklist

### Pre-Update
- [ ] Backup database
- [ ] Backup uploads
- [ ] Backup .env files
- [ ] Backup Nginx config
- [ ] Note current versions
- [ ] Test backup restoration

### Update
- [ ] Stop backend (pm2 stop backend)
- [ ] Pull/upload new code
- [ ] Update backend dependencies
- [ ] Update frontend dependencies
- [ ] Build frontend
- [ ] Check .env files
- [ ] Update database schema (if needed)
- [ ] Restore uploads directory
- [ ] Restart backend
- [ ] Reload Nginx

### Post-Update
- [ ] Check backend logs (pm2 logs)
- [ ] Check Nginx logs
- [ ] Test API endpoints
- [ ] Test frontend loading
- [ ] Test admin panel
- [ ] Test page builder
- [ ] Test image uploads
- [ ] Test published pages
- [ ] Monitor for errors

### Cleanup
- [ ] Remove old code backup (after 1 week)
- [ ] Remove old database backup (after 1 month)
- [ ] Update documentation
- [ ] Notify team of update

## Automated Update Script

Save as `update.sh`:

```bash
#!/bin/bash

echo "🔄 Starting update process..."

# Backup
echo "📦 Creating backup..."
BACKUP_DIR=~/backups/$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
mongodump --db insapi_db --out $BACKUP_DIR/mongodb
cp -r /var/www/myapp/backend/uploads $BACKUP_DIR/
cp /var/www/myapp/backend/.env $BACKUP_DIR/backend.env
cp /var/www/myapp/frontend/.env $BACKUP_DIR/frontend.env
echo "✅ Backup created at $BACKUP_DIR"

# Stop backend
echo "⏸️  Stopping backend..."
pm2 stop backend

# Update code
echo "📥 Pulling latest code..."
cd /var/www/myapp
git pull

# Update backend
echo "🔧 Updating backend..."
cd backend
source venv/bin/activate
pip install -r requirements.txt --upgrade

# Update frontend
echo "🎨 Updating frontend..."
cd ../frontend
npm install
npm run build

# Restart services
echo "🚀 Restarting services..."
pm2 restart backend
sudo systemctl reload nginx

# Check status
echo "✅ Update complete!"
pm2 status
echo ""
echo "Check logs with: pm2 logs backend"
echo "Rollback with: mv /var/www/myapp /var/www/myapp-broken && mv /var/www/myapp-old /var/www/myapp"
```

Make it executable:
```bash
chmod +x update.sh
```

Run it:
```bash
./update.sh
```

## Summary

✅ **Safe Update Process**:
1. Backup everything first
2. Update code (git pull or upload)
3. Update dependencies
4. Build frontend
5. Restart services
6. Test thoroughly
7. Keep backups for rollback

✅ **What's Preserved**:
- Database data
- Uploaded images
- Configuration files
- SSL certificates
- Nginx settings

✅ **Rollback Ready**:
- Old code backed up
- Database backed up
- Quick restore process

**Your data is safe!** The update only changes code, not data.

---

**Need help?** Check logs with `pm2 logs backend` and `sudo tail -f /var/log/nginx/error.log`
