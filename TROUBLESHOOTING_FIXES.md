# Troubleshooting & Fixes

## Issues Fixed

### 1. Navigation Manager - "Failed to save navigation"

**Problem**: Token authentication not working properly

**Fix Applied**:
- Added `extractToken` middleware to navigation routes
- Token now extracted from both query params and headers
- All admin routes now properly authenticated

**Files Modified**:
- `backend/routes/navigation.js` - Added token extraction middleware

### 2. Page Manager - "Failed to convert page"

**Problem**: Token authentication not working properly

**Fix Applied**:
- Added `extractToken` middleware to pages routes
- Token now extracted from both query params and headers
- All admin routes now properly authenticated

**Files Modified**:
- `backend/routes/pages.js` - Added token extraction middleware

### 3. Image Upload - Photos not showing

**Problem**: 
- Upload directory path was hardcoded for Docker
- Static files not properly served
- Wrong URL returned

**Fix Applied**:
- Changed UPLOAD_DIR to use relative path
- Mounted uploads directory as static files
- Updated URLs to use correct server address

**Files Modified**:
- `backend/server.py` - Fixed upload directory and static file serving

## Setup Instructions

### Step 1: Setup Database

Run this script to initialize everything:

```bash
cd backend
node scripts/setupDatabase.js
```

This will:
- Create admin user (admin@insapi.com / admin123456)
- Initialize navigation menu
- Check existing pages

### Step 2: Start Servers

You need to run BOTH servers:

```bash
# Terminal 1 - Node.js (for auth, navigation, pages)
cd backend
npm start

# Terminal 2 - Python (for page builder, uploads)
cd backend
python server.py

# Terminal 3 - Frontend
cd frontend
npm run dev
```

### Step 3: Login to Admin

1. Go to `http://localhost:5173/fast-admin`
2. Login with:
   - Email: `admin@insapi.com`
   - Password: `admin123456`
3. Change password after first login!

### Step 4: Test Features

#### Test Navigation Manager
1. Click "Navigation" tab
2. Update contact email/phone
3. Click "Save Changes"
4. Should see "Navigation saved successfully"

#### Test Page Manager
1. Click "Page Manager" tab
2. Find a static page (e.g., "Home Page")
3. Click "Make Editable"
4. Should see "Home Page is now editable!"

#### Test Image Upload
1. Click "Media Library" tab
2. Click "Upload File"
3. Select an image
4. Should see image preview
5. Image should be visible

## Common Issues & Solutions

### Issue: "Failed to save navigation"

**Cause**: Not logged in or token expired

**Solution**:
1. Logout and login again
2. Check browser console for errors
3. Verify admin user exists: `node scripts/setupDatabase.js`

### Issue: "Failed to convert page"

**Cause**: Page already exists or authentication failed

**Solution**:
1. Check if page already converted (look in "Editable Pages" section)
2. Logout and login again
3. Check MongoDB connection

### Issue: Images not showing after upload

**Cause**: Python server not running or wrong URL

**Solution**:
1. Ensure Python server is running on port 8000
2. Check uploads directory exists: `backend/uploads/`
3. Try accessing image directly: `http://localhost:8000/uploads/filename.jpg`

### Issue: "Token is not valid"

**Cause**: Token expired or admin user doesn't exist

**Solution**:
1. Run setup script: `node scripts/setupDatabase.js`
2. Logout and login again
3. Check JWT_SECRET in .env file

### Issue: MongoDB connection error

**Cause**: MongoDB not running

**Solution**:
```bash
# Start MongoDB
mongod

# Or if using MongoDB service
sudo systemctl start mongod
```

### Issue: Port already in use

**Cause**: Server already running

**Solution**:
```bash
# Find and kill process on port 5001 (Node.js)
lsof -ti:5001 | xargs kill -9

# Find and kill process on port 8000 (Python)
lsof -ti:8000 | xargs kill -9
```

## Verification Checklist

After setup, verify everything works:

- [ ] Admin login works
- [ ] Navigation tab loads
- [ ] Can edit navigation settings
- [ ] Can save navigation changes
- [ ] Page Manager tab loads
- [ ] Can see static pages
- [ ] Can convert static pages
- [ ] Can edit converted pages
- [ ] Media Library tab loads
- [ ] Can upload images
- [ ] Uploaded images display
- [ ] Can delete images

## Environment Variables

Ensure these are set in `backend/.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/marketing-site

# JWT
JWT_SECRET=your-secret-key-change-this

# Server
PORT=5001

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@insapi.com
```

## API Endpoints Reference

### Node.js Server (Port 5001)

```
POST   /api/auth/login              - Admin login
GET    /api/auth/me                 - Get current user
GET    /api/navigation/main-menu    - Get navigation
PUT    /api/navigation/main-menu    - Update navigation (admin)
GET    /api/pages                   - List pages
POST   /api/pages/:id/convert-to-editable - Convert page (admin)
```

### Python Server (Port 8000)

```
POST   /api/upload                  - Upload file (admin)
GET    /uploads/:filename           - Get uploaded file
GET    /api/uploads                 - List uploads (admin)
DELETE /api/uploads/:filename       - Delete upload (admin)
GET    /api/pages/:id               - Get page data
PUT    /api/pages/:id               - Update page (admin)
```

## Database Collections

### users
```javascript
{
  email: "admin@insapi.com",
  password: "hashed",
  name: "Admin User",
  role: "admin"
}
```

### navigations
```javascript
{
  name: "main-menu",
  items: [...],
  settings: {...}
}
```

### pages
```javascript
{
  page_id: "home",
  page_name: "Home Page",
  route: "/",
  type: "builder",
  sections: [...],
  is_published: true,
  is_editable: true
}
```

## Testing Commands

```bash
# Test MongoDB connection
mongosh
use marketing-site
db.users.find()
db.navigations.find()
db.pages.find()

# Test Node.js server
curl http://localhost:5001/api/health

# Test Python server
curl http://localhost:8000/api/health

# Test admin login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@insapi.com","password":"admin123456"}'

# Test navigation (replace TOKEN with actual token)
curl http://localhost:5001/api/navigation/main-menu?token=TOKEN
```

## Logs to Check

### Node.js Server
- Check terminal where `npm start` is running
- Look for request logs: `GET /api/navigation/main-menu`
- Look for errors: `Error:`, `Failed to`

### Python Server
- Check terminal where `python server.py` is running
- Look for request logs: `POST /api/upload`
- Look for errors: `ERROR`, `Exception`

### Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests
- Look for 401 (Unauthorized) or 500 (Server Error)

## Quick Fixes

### Reset Everything
```bash
# Stop all servers
# Delete database
mongosh
use marketing-site
db.dropDatabase()

# Run setup again
cd backend
node scripts/setupDatabase.js

# Restart servers
npm start &
python server.py &
cd ../frontend && npm run dev
```

### Clear Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Reinstall Dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Support

If issues persist:
1. Check all servers are running
2. Check MongoDB is running
3. Check .env file is configured
4. Run setup script again
5. Check browser console for errors
6. Check server logs for errors

## Success Indicators

When everything is working:
- ✅ Admin login successful
- ✅ Navigation saves without errors
- ✅ Pages convert successfully
- ✅ Images upload and display
- ✅ No errors in browser console
- ✅ No errors in server logs

## Next Steps

After fixing issues:
1. Change admin password
2. Configure navigation menu
3. Convert static pages
4. Upload logo and images
5. Customize pages in page builder
6. Test on frontend
7. Deploy to production
