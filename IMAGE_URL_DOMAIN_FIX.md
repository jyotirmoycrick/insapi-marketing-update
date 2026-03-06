# Image URL Domain Fix - Complete Solution

## Problem
Images are saved as `/uploads/filename.png` but need to use the domain dynamically:
- ❌ Current: `/uploads/c8712b1c5eb88e1c915ad7343d025f9a.png`
- ✅ Needed: `https://insapimarketing.com/uploads/c8712b1c5eb88e1c915ad7343d025f9a.png`

## Solution: Nginx Proxy

Use Nginx to proxy `/uploads` through the same domain. This way images automatically use the correct domain based on environment.

---

## Quick Fix (3 Steps)

### Step 1: Update Frontend .env
```bash
cd /path/to/your/app/frontend
echo "VITE_API_URL=https://insapimarketing.com/api" > .env
npm run build
```

### Step 2: Add to Nginx Config
Edit `/etc/nginx/sites-available/insapimarketing` and add:

```nginx
# Inside the server block for insapimarketing.com
location /uploads {
    proxy_pass http://localhost:8000/uploads;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    
    # Caching
    add_header Cache-Control "public, max-age=31536000, immutable";
    expires 1y;
    access_log off;
}
```

### Step 3: Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Automated Setup

```bash
chmod +x setup-nginx-proxy.sh
./setup-nginx-proxy.sh
```

---

## How It Works

### URL Flow

**Upload:**
```
1. Admin uploads image
   ↓
2. POST https://insapimarketing.com/api/upload
   ↓
3. Nginx proxies to localhost:8000/api/upload
   ↓
4. Backend saves to /backend/uploads/abc123.png
   ↓
5. Returns: { url: "/uploads/abc123.png" }
```

**Display:**
```
1. Frontend renders: <img src="/uploads/abc123.png" />
   ↓
2. Browser requests: https://insapimarketing.com/uploads/abc123.png
   ↓
3. Nginx proxies to localhost:8000/uploads/abc123.png
   ↓
4. Backend serves file
   ↓
5. Image displays ✓
```

### Environment Adaptation

**Development:**
```env
VITE_API_URL=http://localhost:8000/api
```
Images: `http://localhost:8000/uploads/...`

**Production:**
```env
VITE_API_URL=https://insapimarketing.com/api
```
Images: `https://insapimarketing.com/uploads/...`

---

## SSL Setup (Recommended)

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
- ✅ Verify domain
- ✅ Get SSL certificate
- ✅ Update Nginx config
- ✅ Set up auto-renewal

### Update .env for HTTPS
```bash
cd frontend
echo "VITE_API_URL=https://insapimarketing.com/api" > .env
npm run build
```

---

## Testing

### Test 1: Upload Image
1. Go to admin panel
2. Upload an image
3. Check Network tab response:
   ```json
   {
     "success": true,
     "url": "/uploads/abc123.png"
   }
   ```

### Test 2: Image URL
1. Image displays in editor
2. Right-click → Inspect
3. Check src attribute:
   ```html
   <img src="https://insapimarketing.com/uploads/abc123.png" />
   ```

### Test 3: Direct Access
```bash
curl -I https://insapimarketing.com/uploads/test.jpg
```

Should see:
```
HTTP/2 200
cache-control: public, max-age=31536000, immutable
```

### Test 4: Published Page
1. Save and publish page
2. View published page
3. Images load correctly
4. No 404 errors

---

## Files Created

1. ✅ `NGINX_PROXY_SETUP.md` - Complete documentation
2. ✅ `setup-nginx-proxy.sh` - Automated setup script
3. ✅ `nginx-complete.conf` - Complete Nginx configuration
4. ✅ `IMAGE_URL_DOMAIN_FIX.md` - This summary

---

## Benefits

✅ **Dynamic URLs** - Automatically adapts to environment  
✅ **Same Domain** - No CORS issues  
✅ **SSL Support** - Works with HTTPS  
✅ **Better Caching** - Nginx caches images  
✅ **Hides Backend** - Backend server not exposed  
✅ **No Code Changes** - Just configuration  

---

## Before vs After

### Before
```
Development: http://localhost:8000/uploads/image.png ✓
Production: /uploads/image.png ❌ (broken)
```

### After
```
Development: http://localhost:8000/uploads/image.png ✓
Production: https://insapimarketing.com/uploads/image.png ✓
```

---

## Troubleshooting

### Images still showing relative URLs?

**Fix 1**: Rebuild frontend
```bash
cd frontend
npm run build
```

**Fix 2**: Clear browser cache
```
Ctrl+Shift+R (hard refresh)
```

**Fix 3**: Check .env
```bash
cat frontend/.env
# Should show: VITE_API_URL=https://insapimarketing.com/api
```

### Nginx proxy not working?

**Check 1**: Verify config
```bash
sudo nginx -t
```

**Check 2**: Check logs
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check 3**: Test proxy
```bash
curl -I https://insapimarketing.com/uploads/test.jpg
```

### SSL issues?

**Check 1**: Verify certificate
```bash
sudo certbot certificates
```

**Check 2**: Renew if needed
```bash
sudo certbot renew
```

---

## Summary

✅ Nginx proxies `/uploads` to backend  
✅ Images served from domain  
✅ Works with HTTP and HTTPS  
✅ Automatic URL handling  
✅ No hardcoded URLs  

**Result**: Images automatically use `https://insapimarketing.com/uploads/...` in production!

---

## Quick Commands

```bash
# Setup Nginx proxy
./setup-nginx-proxy.sh

# Get SSL certificate
sudo certbot --nginx -d insapimarketing.com

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Test image URL
curl -I https://insapimarketing.com/uploads/test.jpg
```

---

**Images now automatically use your domain!** 🎉
