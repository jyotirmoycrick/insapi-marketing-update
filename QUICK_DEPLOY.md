# Quick Deploy - Latest Fixes

## One Command Deploy

```bash
./deploy-latest-fixes.sh
```

That's it! The script handles everything automatically.

---

## What Gets Deployed

✅ Service cards scroll to hero (900x675 size)
✅ Logo fixed at 120px (no compression)
✅ Service pages scroll to top
✅ Editable hero images
✅ Performance optimizations
✅ Dynamic image URLs

---

## After Running Script

### If Local Server:
```bash
sudo cp -r frontend/dist/* /var/www/insapimarketing.com/
sudo systemctl reload nginx
```

### If Remote VPS:
```bash
scp -r frontend/dist/* root@187.124.99.185:/var/www/insapimarketing.com/
ssh root@187.124.99.185 "sudo systemctl reload nginx"
```

---

## Quick Test

1. Visit: http://insapimarketing.com
2. Click any service card → Should scroll to top
3. Resize window → Logo stays 120px
4. Navigate to service page → Starts at top
5. Login to admin → Hero images editable

---

## Troubleshooting

**Images not loading?**
```bash
cd frontend
echo "VITE_API_URL=http://187.124.99.185:8000/api" > .env
npm run build
```

**Backend not running?**
```bash
cd backend
python3 server.py &
```

**Need more help?**
- Read: DEPLOY_LATEST_FIXES.md
- Full guide: COMPLETE_VPS_SETUP_GUIDE.md

---

## Performance Expectations

- LCP: < 2.5 seconds
- Mobile Score: 80-90
- Desktop Score: 90-95
- All images load fast
- Smooth scrolling

---

## Admin Credentials

- URL: http://insapimarketing.com/fast-admin
- Username: `malo`
- Password: `1234567890`

---

That's all you need! 🚀
