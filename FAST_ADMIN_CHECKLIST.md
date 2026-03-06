# /fast-admin Route Fix - Quick Checklist

## The Problem
Cannot access `/fast-admin` on VPS at `insapimarketing.com/fast-admin`

## Root Cause
- Frontend `.env` points to localhost instead of VPS IP
- Nginx missing React Router configuration
- Frontend not rebuilt after `.env` change

---

## Quick Fix (5 Steps)

### ☐ Step 1: Update Frontend .env
```bash
cd /path/to/your/app/frontend
nano .env
```

Change from:
```
VITE_API_URL=http://127.0.0.1:8000/api
```

To:
```
VITE_API_URL=http://187.124.99.185:8000/api
```

### ☐ Step 2: Rebuild Frontend
```bash
npm run build
```

### ☐ Step 3: Update Nginx Config
```bash
sudo nano /etc/nginx/sites-available/insapimarketing
```

Ensure you have:
```nginx
server {
    listen 80;
    server_name insapimarketing.com www.insapimarketing.com;
    
    root /path/to/your/app/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;  # ← THIS LINE IS CRITICAL
    }
}
```

### ☐ Step 4: Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### ☐ Step 5: Verify Backend Running
```bash
ps aux | grep python
curl http://localhost:8000/api/components/templates
```

If not running:
```bash
cd /path/to/your/app/backend
python3 server.py
```

---

## Test It

1. Clear browser cache (Ctrl+Shift+R)
2. Visit: http://insapimarketing.com/fast-admin
3. Login:
   - Username: `malo`
   - Password: `1234567890`

---

## Automated Fix

Run the diagnostic script:
```bash
chmod +x diagnose-vps.sh
./diagnose-vps.sh
```

Or run the quick fix:
```bash
chmod +x quick-fix-fast-admin.sh
./quick-fix-fast-admin.sh
```

---

## Still Not Working?

### Check 1: Browser Console
- Press F12
- Look for errors
- Common: "Failed to fetch" = backend not accessible

### Check 2: Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check 3: Backend Logs
```bash
tail -f /path/to/your/app/backend/backend.log
```

### Check 4: Test API Directly
```bash
curl http://187.124.99.185:8000/api/components/templates
```

Should return JSON data.

---

## Files Created

1. `VPS_FAST_ADMIN_FIX.md` - Detailed guide with troubleshooting
2. `diagnose-vps.sh` - Diagnostic script to identify issues
3. `quick-fix-fast-admin.sh` - Automated fix script
4. `FAST_ADMIN_CHECKLIST.md` - This checklist

---

## Key Points

✓ The `/fast-admin` route exists in React Router (frontend)  
✓ Nginx must pass ALL routes to `index.html` for React Router to work  
✓ Frontend must be rebuilt after changing `.env`  
✓ Backend must be accessible from frontend  

---

## Need Help?

See `VPS_FAST_ADMIN_FIX.md` for:
- Complete Nginx configuration example
- SSL/HTTPS setup
- Detailed troubleshooting
- CORS configuration
- PM2 process management
