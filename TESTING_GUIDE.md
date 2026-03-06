# Complete Testing Guide

## 🚀 Setup (Do This First!)

### Step 1: Setup Database
```bash
cd backend
node scripts/setupDatabase.js
```

**Expected Output:**
```
✅ Connected to MongoDB
✅ Admin user created
✅ Navigation created
🎉 Database setup complete!
```

### Step 2: Start All Servers

**Terminal 1 - Node.js (MUST RUN):**
```bash
cd backend
npm start
```

**Expected Output:**
```
🚀 Server running on port 5001
✅ MongoDB connected successfully
```

**Terminal 2 - Python (MUST RUN):**
```bash
cd backend
python server.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
➜  Local:   http://localhost:5173/
```

## ✅ Test 1: Admin Login

1. Open: http://localhost:5173/fast-admin
2. Enter:
   - Username: `malo`
   - Password: `1234567890`
3. Click "Login"

**Expected Result:** ✅ Redirects to dashboard

**If Failed:**
- Check Python server is running
- Check browser console for errors
- Try clearing browser cache

## ✅ Test 2: Navigation Manager

1. Click "Navigation" tab
2. Scroll to "Navigation Settings"
3. Update:
   - Contact Email: `test@example.com`
   - Contact Phone: `+91 9876543210`
4. Click "Save Changes" button at top

**Expected Result:** ✅ "Navigation saved successfully"

**If Failed:**
- Check Node.js server is running on port 5001
- Check browser console (F12) for errors
- Check Node.js terminal for errors
- Verify MongoDB is running

**Debug Commands:**
```bash
# Test Node.js server
curl http://localhost:5001/api/health

# Test navigation endpoint
curl http://localhost:5001/api/navigation/main-menu

# Check MongoDB
mongosh
use marketing-site
db.navigations.find()
```

## ✅ Test 3: Page Manager - Convert Page

1. Click "Page Manager" tab
2. Find "Home Page" in "Static React Pages" section
3. Click "Make Editable" button
4. Wait 2-3 seconds

**Expected Result:** ✅ "Home Page is now editable!"

**If Failed:**
- Check Node.js server logs
- Check if page already exists:
  ```bash
  mongosh
  use marketing-site
  db.pages.find({page_id: "home"})
  ```
- If exists, delete it:
  ```bash
  db.pages.deleteOne({page_id: "home"})
  ```
- Try again

## ✅ Test 4: Dynamic Navigation on Frontend

1. Open new tab: http://localhost:5173
2. Check navigation menu

**Expected Result:** ✅ Navigation loads from database

**Test Changes:**
1. Go back to admin → Navigation tab
2. Add new menu item:
   - Label: "Test"
   - Path: "/test"
   - Type: Link
3. Save changes
4. Refresh frontend tab
5. **Expected:** "Test" appears in navigation ✅

**If Failed:**
- Check if DynamicHeader is being used in App.tsx
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

## ✅ Test 5: Image Upload

1. Click "Media Library" tab
2. Click "Upload File" button
3. Select any image file
4. Wait for upload

**Expected Result:** ✅ Image appears in grid

**If Failed:**
- Check Python server is running on port 8000
- Check uploads directory exists: `backend/uploads/`
- Check Python server logs
- Try accessing: http://localhost:8000/uploads/

## ✅ Test 6: Page Builder

1. Click "Page Builder" tab
2. Select a page from left panel
3. Try dragging a widget (e.g., "Heading")
4. Drop it on canvas
5. Edit properties in right panel
6. Click "Save"

**Expected Result:** ✅ Widget appears and saves

**Known Issues:**
- Drag-and-drop may need improvement
- Container functionality limited
- Some widgets may not render on live page

**Workaround:**
- Use Python page builder API directly
- See `PAGE_BUILDER_IMPROVEMENTS.md` for details

## 🔍 Troubleshooting

### Issue: "Failed to save navigation"

**Checklist:**
- [ ] Node.js server running on port 5001?
- [ ] MongoDB running?
- [ ] Logged in as admin?
- [ ] Token in localStorage?

**Fix:**
```bash
# Restart Node.js server
cd backend
npm start

# Check MongoDB
mongod

# Re-login to admin panel
```

### Issue: "Failed to convert page"

**Checklist:**
- [ ] Node.js server running?
- [ ] Page doesn't already exist?
- [ ] MongoDB connected?

**Fix:**
```bash
# Check if page exists
mongosh
use marketing-site
db.pages.find({page_id: "home"})

# Delete if exists
db.pages.deleteOne({page_id: "home"})

# Try converting again
```

### Issue: Navigation not updating on frontend

**Checklist:**
- [ ] DynamicHeader in App.tsx?
- [ ] Browser cache cleared?
- [ ] Node.js server running?

**Fix:**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# Check App.tsx uses DynamicHeader
# (Already fixed in code)
```

### Issue: Images not showing

**Checklist:**
- [ ] Python server running on port 8000?
- [ ] Uploads directory exists?
- [ ] Image uploaded successfully?

**Fix:**
```bash
# Check Python server
curl http://localhost:8000/api/health

# Check uploads directory
ls backend/uploads/

# Restart Python server
cd backend
python server.py
```

## 📊 Server Status Check

Run these commands to verify everything is working:

```bash
# Check Node.js server
curl http://localhost:5001/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Check Python server
curl http://localhost:8000/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Check navigation
curl http://localhost:5001/api/navigation/main-menu
# Expected: JSON with navigation data

# Check pages
curl http://localhost:5001/api/pages
# Expected: JSON array of pages

# Check MongoDB
mongosh
use marketing-site
db.navigations.find().pretty()
db.pages.find().pretty()
```

## ✅ Success Checklist

After all tests, you should have:

- [ ] Admin login works
- [ ] Navigation Manager saves changes
- [ ] Changes persist after refresh
- [ ] Page Manager converts pages
- [ ] Converted pages appear in "Editable Pages"
- [ ] Dynamic navigation works on frontend
- [ ] Navigation updates in real-time
- [ ] Images upload successfully
- [ ] Images display in media library
- [ ] Page Builder loads
- [ ] Can add widgets
- [ ] Can save pages

## 🎯 What's Working Now

✅ **Authentication** - Fixed! Both systems work
✅ **Navigation Manager** - Saves correctly
✅ **Page Manager** - Converts pages
✅ **Dynamic Navigation** - Updates in real-time
✅ **Image Upload** - Works properly

⏳ **Page Builder** - Needs improvements (see PAGE_BUILDER_IMPROVEMENTS.md)

## 📝 Next Steps

1. ✅ Complete all tests above
2. ✅ Verify everything works
3. ⏳ Improve page builder (if needed)
4. ⏳ Add more features
5. ⏳ Deploy to production

## 💡 Pro Tips

- Keep all 3 terminals open
- Check server logs if something fails
- Use browser DevTools (F12) to debug
- Clear cache if changes don't appear
- Logout and login if token expires

## 🆘 Still Having Issues?

1. Check `AUTHENTICATION_FIX.md` for auth details
2. Check `PAGE_BUILDER_IMPROVEMENTS.md` for builder issues
3. Check server logs for errors
4. Check browser console for errors
5. Verify all servers are running
6. Verify MongoDB is running

## 🎉 Success!

If all tests pass, your CMS is working! You can now:
- Edit navigation from admin panel
- Convert static pages to editable
- Manage all content from dashboard
- No code changes needed!

**Enjoy your WordPress/Elementor-like CMS! 🚀**
