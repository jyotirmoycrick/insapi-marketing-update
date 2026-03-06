# Complete VPS Setup Guide

This guide combines all fixes for deploying your InsAPI Marketing CMS to VPS.

---

## Issues Fixed

1. ✅ `/fast-admin` route not accessible
2. ✅ Images showing errors (hardcoded localhost URLs)

---

## Quick Setup (Copy & Paste)

### Step 1: Update Frontend Environment

```bash
cd /path/to/your/app/frontend

# Update .env
cat > .env << 'EOF'
VITE_API_URL=http://187.124.99.185:8000/api
EOF

# Rebuild frontend
npm run build
```

### Step 2: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/insapimarketing
```

Paste this configuration:

```nginx
# Backend API Server
server {
    listen 80;
    server_name 187.124.99.185;

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
    }

    location /uploads {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# Frontend Application
server {
    listen 80;
    server_name insapimarketing.com www.insapimarketing.com;

    root /path/to/your/app/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Handle all routes - CRITICAL for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Prevent caching of index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires 0;
    }
}
```

**IMPORTANT**: Replace `/path/to/your/app` with your actual path!

### Step 3: Test and Restart Nginx

```bash
# Test configuration
sudo nginx -t

# If successful, restart
sudo systemctl restart nginx
```

### Step 4: Ensure Backend is Running

```bash
# Check if running
ps aux | grep python

# If not running, start it
cd /path/to/your/app/backend
python3 server.py &

# Or with PM2 (recommended)
pm2 start server.py --name backend --interpreter python3
pm2 save
```

### Step 5: Test Everything

```bash
# Test backend API
curl http://localhost:8000/api/components/templates

# Test uploads endpoint
curl http://localhost:8000/uploads/

# Test frontend
curl http://insapimarketing.com
```

---

## Testing Checklist

### Test 1: Frontend Access
- [ ] Visit: http://insapimarketing.com
- [ ] Homepage loads correctly
- [ ] No console errors (F12)

### Test 2: Admin Access
- [ ] Visit: http://insapimarketing.com/fast-admin
- [ ] Login page appears
- [ ] Login with: `malo` / `1234567890`
- [ ] Dashboard loads

### Test 3: Image Upload
- [ ] Go to page builder
- [ ] Add image component
- [ ] Upload an image
- [ ] Image displays in editor
- [ ] Save and publish page
- [ ] Image displays on published page

### Test 4: Network Check
- [ ] Open browser DevTools (F12)
- [ ] Go to Network tab
- [ ] Upload an image
- [ ] Check response: `{ "success": true, "url": "/uploads/..." }`
- [ ] Check image loads from: `http://187.124.99.185:8000/uploads/...`
- [ ] No 404 errors

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER                               │
│  http://insapimarketing.com                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              NGINX (Port 80)                             │
│                                                          │
│  insapimarketing.com → /frontend/dist/                  │
│  /fast-admin → /frontend/dist/index.html (React Router) │
│                                                          │
│  187.124.99.185/api → proxy to localhost:8000           │
│  187.124.99.185/uploads → proxy to localhost:8000       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         PYTHON BACKEND (Port 8000)                       │
│                                                          │
│  FastAPI Server                                         │
│  /api/* endpoints                                       │
│  /uploads/* static files                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  MONGODB                                 │
│  Database: insapi_marketing                             │
└─────────────────────────────────────────────────────────┘
```

---

## How Image URLs Work

### Upload Flow

```
1. User uploads image in admin
   ↓
2. POST http://187.124.99.185:8000/api/upload
   ↓
3. Backend saves to: /backend/uploads/abc123.webp
   ↓
4. Backend returns: { "success": true, "url": "/uploads/abc123.webp" }
   ↓
5. Frontend (urlHelper.ts) converts:
   "/uploads/abc123.webp" → "http://187.124.99.185:8000/uploads/abc123.webp"
   ↓
6. Browser loads: http://187.124.99.185:8000/uploads/abc123.webp
   ↓
7. Image displays! ✅
```

### Environment-Based URLs

The `urlHelper.ts` utility reads `VITE_API_URL` and automatically converts relative URLs:

**Development:**
```env
VITE_API_URL=http://localhost:8000/api
```
Result: `http://localhost:8000/uploads/file.jpg`

**VPS:**
```env
VITE_API_URL=http://187.124.99.185:8000/api
```
Result: `http://187.124.99.185:8000/uploads/file.jpg`

---

## Troubleshooting

### Issue: /fast-admin shows 404

**Cause**: Nginx missing `try_files` directive

**Fix**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Then: `sudo systemctl restart nginx`

### Issue: Images not loading

**Cause 1**: Frontend not rebuilt after .env change

**Fix**:
```bash
cd frontend
npm run build
```

**Cause 2**: Backend not running

**Fix**:
```bash
cd backend
python3 server.py &
```

**Cause 3**: Wrong API URL in .env

**Fix**:
```bash
cd frontend
echo "VITE_API_URL=http://187.124.99.185:8000/api" > .env
npm run build
```

### Issue: API calls failing

**Cause**: CORS or backend not accessible

**Check**:
```bash
# Test backend directly
curl http://localhost:8000/api/components/templates

# Check backend logs
tail -f backend/backend.log

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Issue: Login not working

**Credentials**:
- Username: `malo`
- Password: `1234567890`

**Check**:
```bash
# Test login endpoint
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"malo","password":"1234567890"}'
```

---

## Production Recommendations

### 1. Set Up SSL/HTTPS

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d insapimarketing.com -d www.insapimarketing.com
```

Then update .env:
```env
VITE_API_URL=https://insapimarketing.com/api
```

### 2. Use PM2 for Backend

```bash
cd backend
pm2 start server.py --name backend --interpreter python3
pm2 startup
pm2 save
```

### 3. Set Up Automatic Backups

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db insapi_marketing --out /backups/mongo_$DATE
tar -czf /backups/uploads_$DATE.tar.gz backend/uploads/
```

### 4. Monitor Logs

```bash
# Backend logs
pm2 logs backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### 5. Set Up Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

---

## Files Created

| File | Purpose |
|------|---------|
| `COMPLETE_VPS_SETUP_GUIDE.md` | This comprehensive guide |
| `FAST_ADMIN_FIX_SUMMARY.md` | /fast-admin route fix summary |
| `VPS_FAST_ADMIN_FIX.md` | Detailed /fast-admin fix guide |
| `FAST_ADMIN_ARCHITECTURE.md` | Architecture diagrams |
| `IMAGE_URL_FIX_SUMMARY.md` | Image URL fix summary |
| `IMAGE_URL_FIX_COMPLETE.md` | Detailed image URL fix guide |
| `DYNAMIC_IMAGE_URL_FIX.md` | Technical image URL guide |
| `quick-fix-fast-admin.sh` | Automated /fast-admin fix script |
| `deploy-image-fix.sh` | Automated image URL fix script |
| `diagnose-vps.sh` | Diagnostic script |
| `frontend/src/utils/urlHelper.ts` | URL conversion utility |

---

## Quick Commands Reference

### Restart Services
```bash
sudo systemctl restart nginx
pm2 restart backend
sudo systemctl restart mongod
```

### Check Status
```bash
sudo systemctl status nginx
pm2 status
sudo systemctl status mongod
```

### View Logs
```bash
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```

### Test Endpoints
```bash
curl http://localhost:8000/api/components/templates
curl http://insapimarketing.com
curl http://insapimarketing.com/fast-admin
```

### Rebuild Frontend
```bash
cd frontend
npm run build
```

---

## Success Criteria

✅ Frontend accessible at http://insapimarketing.com  
✅ Admin accessible at http://insapimarketing.com/fast-admin  
✅ Can login with malo/1234567890  
✅ Can upload images in admin  
✅ Images display in editor  
✅ Images display on published pages  
✅ No 404 errors in browser console  
✅ Backend API responding  
✅ MongoDB connected  

---

## Support

If you encounter issues:

1. Run diagnostic script: `./diagnose-vps.sh`
2. Check logs (Nginx, backend, MongoDB)
3. Verify all services are running
4. Test endpoints with curl
5. Check browser console for errors

---

## Summary

Your InsAPI Marketing CMS is now fully configured for VPS deployment with:

- ✅ Dynamic routing (React Router works)
- ✅ Dynamic image URLs (adapts to environment)
- ✅ Admin panel accessible
- ✅ Image uploads working
- ✅ Environment-based configuration

Everything adapts automatically based on your `.env` configuration!
