# Quick Fix Reference Card

## Problem 1: /fast-admin Not Working ❌

### Quick Fix
```bash
# 1. Update .env
cd frontend
echo "VITE_API_URL=http://187.124.99.185:8000/api" > .env

# 2. Rebuild
npm run build

# 3. Add to Nginx config
location / {
    try_files $uri $uri/ /index.html;
}

# 4. Restart
sudo systemctl restart nginx
```

---

## Problem 2: Images Not Loading ❌

### Quick Fix
```bash
# Already fixed! Just rebuild:
cd frontend
npm run build
```

The `urlHelper.ts` utility now automatically converts image URLs based on your `.env` configuration.

---

## One-Command Deploy

```bash
# Update .env, rebuild, restart
cd frontend && \
echo "VITE_API_URL=http://187.124.99.185:8000/api" > .env && \
npm run build && \
cd .. && \
sudo systemctl restart nginx
```

---

## Test Commands

```bash
# Test backend
curl http://localhost:8000/api/components/templates

# Test frontend
curl http://insapimarketing.com

# Test admin route
curl http://insapimarketing.com/fast-admin

# Check services
ps aux | grep python
sudo systemctl status nginx
```

---

## Admin Credentials

- URL: http://insapimarketing.com/fast-admin
- Username: `malo`
- Password: `1234567890`

---

## File Locations

```
/path/to/your/app/
├── frontend/
│   ├── .env                    ← API URL config
│   ├── dist/                   ← Built files (Nginx serves this)
│   └── src/utils/urlHelper.ts  ← Image URL converter
├── backend/
│   ├── server.py               ← FastAPI backend
│   └── uploads/                ← Uploaded images
└── /etc/nginx/sites-available/
    └── insapimarketing         ← Nginx config
```

---

## Critical Nginx Config

```nginx
server {
    listen 80;
    server_name insapimarketing.com;
    root /path/to/app/frontend/dist;
    
    location / {
        try_files $uri $uri/ /index.html;  # ← CRITICAL!
    }
}
```

---

## Environment Variables

### Development
```env
VITE_API_URL=http://localhost:8000/api
```

### VPS
```env
VITE_API_URL=http://187.124.99.185:8000/api
```

### Production (with SSL)
```env
VITE_API_URL=https://insapimarketing.com/api
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on /fast-admin | Add `try_files` to Nginx, restart |
| Images not loading | Rebuild frontend: `npm run build` |
| API calls failing | Check backend is running: `ps aux \| grep python` |
| Login not working | Check credentials: malo/1234567890 |
| Changes not showing | Clear cache: Ctrl+Shift+R |

---

## Quick Diagnostic

```bash
# Run this to check everything
./diagnose-vps.sh
```

Or manually:
```bash
# 1. Check .env
cat frontend/.env

# 2. Check build date
ls -la frontend/dist/index.html

# 3. Check Nginx config
sudo nginx -t

# 4. Check backend
ps aux | grep python

# 5. Test API
curl http://localhost:8000/api/components/templates
```

---

## Success Checklist

- [ ] Frontend .env has correct API URL
- [ ] Frontend rebuilt after .env change
- [ ] Nginx has `try_files` directive
- [ ] Nginx restarted
- [ ] Backend is running
- [ ] Can access http://insapimarketing.com
- [ ] Can access http://insapimarketing.com/fast-admin
- [ ] Can login to admin
- [ ] Can upload images
- [ ] Images display correctly

---

## Documentation Files

| File | Use When |
|------|----------|
| `QUICK_FIX_REFERENCE.md` | Quick commands (this file) |
| `COMPLETE_VPS_SETUP_GUIDE.md` | Complete setup from scratch |
| `FAST_ADMIN_FIX_SUMMARY.md` | /fast-admin not working |
| `IMAGE_URL_FIX_SUMMARY.md` | Images not loading |
| `diagnose-vps.sh` | Diagnosing issues |
| `deploy-image-fix.sh` | Deploying image fix |
| `quick-fix-fast-admin.sh` | Fixing /fast-admin |

---

## Support Commands

```bash
# View logs
pm2 logs backend
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart backend
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod
```

---

## Remember

1. **Always rebuild** after changing `.env`
2. **Clear browser cache** after deploying
3. **Check logs** if something doesn't work
4. **Test backend** before blaming frontend

---

## Quick Deploy Checklist

```bash
# 1. Update code
git pull

# 2. Update .env
cd frontend
nano .env  # Set VITE_API_URL

# 3. Rebuild
npm run build

# 4. Restart
sudo systemctl restart nginx
pm2 restart backend

# 5. Test
curl http://insapimarketing.com/fast-admin
```

---

## Emergency Reset

If everything is broken:

```bash
# 1. Stop everything
pm2 stop all
sudo systemctl stop nginx

# 2. Check configs
cat frontend/.env
sudo nginx -t

# 3. Rebuild
cd frontend
npm run build

# 4. Start everything
sudo systemctl start nginx
pm2 start backend

# 5. Check logs
pm2 logs backend
sudo tail -f /var/log/nginx/error.log
```

---

## Key Takeaways

✅ `/fast-admin` needs `try_files` in Nginx  
✅ Images need `urlHelper.ts` (already added)  
✅ Always rebuild after `.env` changes  
✅ Everything adapts to `VITE_API_URL`  

---

**Need help?** Run `./diagnose-vps.sh` for automated diagnostics!
