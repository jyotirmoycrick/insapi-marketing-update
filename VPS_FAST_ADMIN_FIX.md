# Fix /fast-admin Route on VPS

## Problem
The `/fast-admin` route is not accessible on your VPS deployment at `insapimarketing.com/fast-admin`

## Root Causes

### 1. Frontend Environment Variable
Your frontend `.env` file has:
```
VITE_API_URL=http://127.0.0.1:8000/api
```

This needs to be updated to your VPS backend URL.

### 2. Backend CORS Configuration
The backend has `allow_origins=["*"]` which is fine, but we need to ensure it's running and accessible.

### 3. Nginx Configuration
Nginx needs to properly handle React Router client-side routes.

### 4. Frontend Build
The frontend needs to be rebuilt with the correct environment variables.

---

## Solution Steps

### Step 1: Update Frontend Environment Variable

SSH into your VPS and update the frontend `.env` file:

```bash
cd /path/to/your/app/frontend
nano .env
```

Change:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

To:
```env
VITE_API_URL=http://187.124.99.185:8000/api
```

Save and exit (Ctrl+X, Y, Enter)

### Step 2: Rebuild Frontend

```bash
cd /path/to/your/app/frontend
npm run build
```

This creates a new `dist` folder with the correct API URL.

### Step 3: Update Nginx Configuration

Edit your Nginx config:

```bash
sudo nano /etc/nginx/sites-available/insapimarketing
```

Your Nginx config should look like this:

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

**IMPORTANT**: Replace `/path/to/your/app` with your actual path (e.g., `/home/username/myapp`)

The critical line is:
```nginx
try_files $uri $uri/ /index.html;
```

This ensures all routes (including `/fast-admin`) are handled by React Router.

### Step 4: Test and Restart Nginx

Test the configuration:
```bash
sudo nginx -t
```

If successful, restart Nginx:
```bash
sudo systemctl restart nginx
```

### Step 5: Verify Backend is Running

Check if your Python backend is running:
```bash
ps aux | grep python
```

You should see a process running `server.py` on port 8000.

If not running, start it:
```bash
cd /path/to/your/app/backend
python3 server.py
```

Or if using PM2:
```bash
pm2 start server.py --name backend --interpreter python3
pm2 save
```

---

## Quick Fix Script

Create a file `fix-fast-admin.sh`:

```bash
#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Fixing /fast-admin route...${NC}"

# Update frontend .env
echo -e "${GREEN}1. Updating frontend .env...${NC}"
cd /path/to/your/app/frontend
cat > .env << EOF
VITE_API_URL=http://187.124.99.185:8000/api
EOF

# Rebuild frontend
echo -e "${GREEN}2. Rebuilding frontend...${NC}"
npm run build

# Restart Nginx
echo -e "${GREEN}3. Restarting Nginx...${NC}"
sudo systemctl restart nginx

# Check backend
echo -e "${GREEN}4. Checking backend status...${NC}"
if ps aux | grep -q "[p]ython.*server.py"; then
    echo -e "${GREEN}Backend is running ✓${NC}"
else
    echo -e "${YELLOW}Backend not running. Starting...${NC}"
    cd /path/to/your/app/backend
    nohup python3 server.py > backend.log 2>&1 &
fi

echo -e "${GREEN}Done! Try accessing: http://insapimarketing.com/fast-admin${NC}"
```

Make it executable and run:
```bash
chmod +x fix-fast-admin.sh
./fix-fast-admin.sh
```

---

## Testing

After completing the steps, test these URLs:

1. **Frontend**: http://insapimarketing.com
2. **Fast Admin**: http://insapimarketing.com/fast-admin
3. **Backend API**: http://187.124.99.185:8000/api/components/templates
4. **Admin Login**: http://insapimarketing.com/admin-login

### Test Admin Login
1. Go to: http://insapimarketing.com/fast-admin
2. You should see the login page
3. Login with:
   - Username: `malo`
   - Password: `1234567890`

---

## Troubleshooting

### Issue: Still getting 404 on /fast-admin

**Check 1**: Verify Nginx config has `try_files`
```bash
sudo cat /etc/nginx/sites-available/insapimarketing | grep try_files
```

Should show: `try_files $uri $uri/ /index.html;`

**Check 2**: Verify frontend was rebuilt
```bash
ls -la /path/to/your/app/frontend/dist/index.html
```

Check the timestamp - should be recent.

**Check 3**: Check Nginx error logs
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check 4**: Clear browser cache
- Press Ctrl+Shift+R (hard refresh)
- Or open in incognito mode

### Issue: API calls failing

**Check 1**: Verify backend is running
```bash
curl http://localhost:8000/api/components/templates
```

Should return JSON data.

**Check 2**: Check backend logs
```bash
cd /path/to/your/app/backend
tail -f backend.log
```

**Check 3**: Test from frontend
Open browser console on insapimarketing.com and run:
```javascript
fetch('http://187.124.99.185:8000/api/components/templates')
  .then(r => r.json())
  .then(console.log)
```

### Issue: CORS errors

If you see CORS errors in browser console, update backend CORS to be more specific:

Edit `backend/server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://insapimarketing.com",
        "https://insapimarketing.com",
        "http://www.insapimarketing.com",
        "https://www.insapimarketing.com",
        "http://187.124.99.185:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then restart backend:
```bash
pm2 restart backend
```

---

## SSL/HTTPS Setup (Recommended)

For production, you should use HTTPS. Install Let's Encrypt SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d insapimarketing.com -d www.insapimarketing.com
```

Then update frontend `.env`:
```env
VITE_API_URL=https://insapimarketing.com/api
```

And update Nginx to proxy backend through the same domain:
```nginx
location /api {
    proxy_pass http://localhost:8000;
    # ... rest of proxy settings
}
```

---

## Summary

The issue is that:
1. Frontend `.env` points to localhost instead of VPS IP
2. Nginx needs `try_files $uri $uri/ /index.html;` for React Router
3. Frontend needs to be rebuilt after changing `.env`

After following these steps, `/fast-admin` should work perfectly!
