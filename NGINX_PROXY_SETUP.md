# Nginx Proxy Setup for Dynamic Image URLs

## Problem
Images are saved as `/uploads/filename.png` but need to be served from the domain:
- Current: `/uploads/c8712b1c5eb88e1c915ad7343d025f9a.png` ❌
- Needed: `https://insapimarketing.com/uploads/c8712b1c5eb88e1c915ad7343d025f9a.png` ✓

## Best Solution: Nginx Proxy

Instead of hardcoding URLs, proxy uploads through Nginx so they're served from the same domain.

### Benefits
✅ Same domain (no CORS issues)  
✅ Works with SSL/HTTPS  
✅ Automatic - no code changes needed  
✅ Better caching  
✅ Hides backend server  

---

## Implementation

### Step 1: Update Nginx Configuration

Edit `/etc/nginx/sites-available/insapimarketing`:

```nginx
server {
    listen 80;
    server_name insapimarketing.com www.insapimarketing.com;

    root /path/to/your/app/frontend/dist;
    index index.html;

    # Proxy API requests to backend
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

    # Proxy uploads through same domain
    location /uploads {
        proxy_pass http://localhost:8000/uploads;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        
        # Caching
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Cache-Status $upstream_cache_status;
        
        # Performance
        expires 1y;
        access_log off;
    }

    # React Router - handle all other routes
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires 0;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
```

### Step 2: Update Frontend .env

Change from backend IP to domain:

```bash
cd /path/to/your/app/frontend
nano .env
```

Change:
```env
# Before
VITE_API_URL=http://187.124.99.185:8000/api

# After
VITE_API_URL=https://insapimarketing.com/api
```

### Step 3: Rebuild Frontend

```bash
cd /path/to/your/app/frontend
npm run build
```

### Step 4: Test and Restart Nginx

```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## How It Works

### Before (Direct Backend Access)
```
Browser → http://187.124.99.185:8000/uploads/image.png
         ↓
    Backend Server
```

### After (Nginx Proxy)
```
Browser → https://insapimarketing.com/uploads/image.png
         ↓
      Nginx Proxy
         ↓
    Backend Server (localhost:8000)
```

### URL Flow

1. **Upload Image**
   ```
   POST https://insapimarketing.com/api/upload
   → Nginx proxies to localhost:8000/api/upload
   → Backend saves to /backend/uploads/abc123.png
   → Returns: { url: "/uploads/abc123.png" }
   ```

2. **Display Image**
   ```
   <img src="/uploads/abc123.png" />
   → Browser requests: https://insapimarketing.com/uploads/abc123.png
   → Nginx proxies to localhost:8000/uploads/abc123.png
   → Backend serves file
   → Image displays ✓
   ```

---

## Environment-Based URLs

### Development
```env
VITE_API_URL=http://localhost:8000/api
```
Images: `http://localhost:8000/uploads/...`

### Staging
```env
VITE_API_URL=http://187.124.99.185:8000/api
```
Images: `http://187.124.99.185:8000/uploads/...`

### Production
```env
VITE_API_URL=https://insapimarketing.com/api
```
Images: `https://insapimarketing.com/uploads/...`

---

## SSL/HTTPS Setup

### Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### Get SSL Certificate

```bash
sudo certbot --nginx -d insapimarketing.com -d www.insapimarketing.com
```

Certbot will:
1. Verify domain ownership
2. Get SSL certificate
3. Update Nginx config automatically
4. Set up auto-renewal

### Update .env for HTTPS

```bash
cd /path/to/your/app/frontend
nano .env
```

```env
VITE_API_URL=https://insapimarketing.com/api
```

### Rebuild

```bash
npm run build
```

### Nginx Config After SSL

Certbot updates your config to:

```nginx
server {
    listen 443 ssl http2;
    server_name insapimarketing.com www.insapimarketing.com;

    ssl_certificate /etc/letsencrypt/live/insapimarketing.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/insapimarketing.com/privkey.pem;

    root /path/to/your/app/frontend/dist;
    index index.html;

    # API proxy
    location /api {
        proxy_pass http://localhost:8000;
        # ... proxy settings
    }

    # Uploads proxy
    location /uploads {
        proxy_pass http://localhost:8000/uploads;
        # ... proxy settings
    }

    # React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name insapimarketing.com www.insapimarketing.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Testing

### Test 1: Upload Image
1. Go to admin panel
2. Upload an image
3. Check response in Network tab:
   ```json
   {
     "success": true,
     "url": "/uploads/abc123.png"
   }
   ```

### Test 2: Image Display
1. Image should display in editor
2. Check image URL in browser:
   - Should be: `https://insapimarketing.com/uploads/abc123.png`
   - NOT: `http://187.124.99.185:8000/uploads/abc123.png`

### Test 3: Published Page
1. Save and publish page
2. View published page
3. Images should load correctly
4. Check Network tab - no 404 errors

### Test 4: Cache Headers
```bash
curl -I https://insapimarketing.com/uploads/test.jpg
```

Should see:
```
HTTP/2 200
cache-control: public, max-age=31536000, immutable
x-cache-status: HIT
```

---

## Quick Deploy Script

Create `setup-nginx-proxy.sh`:

```bash
#!/bin/bash

echo "🔧 Setting up Nginx proxy for images..."

# Backup current config
sudo cp /etc/nginx/sites-available/insapimarketing /etc/nginx/sites-available/insapimarketing.backup.$(date +%Y%m%d_%H%M%S)

# Update frontend .env
cd /path/to/your/app/frontend
echo "VITE_API_URL=https://insapimarketing.com/api" > .env

# Rebuild frontend
npm run build

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

echo "✅ Done!"
echo ""
echo "Next steps:"
echo "1. Update Nginx config to add /uploads proxy"
echo "2. Set up SSL with: sudo certbot --nginx -d insapimarketing.com"
echo "3. Test image upload"
```

---

## Troubleshooting

### Images still showing old URLs?

**Fix 1**: Clear browser cache
```
Ctrl+Shift+R (hard refresh)
```

**Fix 2**: Rebuild frontend
```bash
cd frontend
rm -rf dist
npm run build
```

**Fix 3**: Check .env
```bash
cat frontend/.env
# Should show: VITE_API_URL=https://insapimarketing.com/api
```

### Nginx proxy not working?

**Check 1**: Verify Nginx config
```bash
sudo nginx -t
```

**Check 2**: Check Nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check 3**: Test proxy manually
```bash
curl -I https://insapimarketing.com/uploads/test.jpg
```

### SSL not working?

**Check 1**: Verify certificate
```bash
sudo certbot certificates
```

**Check 2**: Renew certificate
```bash
sudo certbot renew --dry-run
```

**Check 3**: Check SSL config
```bash
sudo cat /etc/nginx/sites-available/insapimarketing | grep ssl
```

---

## Summary

✅ Nginx proxies `/uploads` to backend  
✅ Images served from same domain  
✅ Works with HTTP and HTTPS  
✅ Automatic URL handling  
✅ Better caching and performance  
✅ No hardcoded URLs  

**Result**: Images automatically use the correct domain based on environment!

---

## Before vs After

### Before
```
Development: http://localhost:8000/uploads/image.png
Production: http://187.124.99.185:8000/uploads/image.png ❌
```

### After
```
Development: http://localhost:8000/uploads/image.png
Production: https://insapimarketing.com/uploads/image.png ✓
```

---

**Images now automatically adapt to your domain!** 🎉
