# InsAPI Marketing CMS - Complete Setup Guide

## 🎉 What's Fixed

All issues have been resolved:
- ✅ Navigation Manager now saves correctly
- ✅ Page Manager converts static pages successfully
- ✅ Image uploads work and display properly
- ✅ Full WordPress/Elementor-like functionality

## 🚀 Quick Start (Easiest Way)

### For Linux/Mac:
```bash
./start-all.sh
```

### For Windows:
```bash
start-all.bat
```

This will:
1. Setup the database with admin user
2. Initialize navigation
3. Start all three servers
4. Open the application

Then go to: **http://localhost:5173/fast-admin**

Login with:
- Email: `admin@insapi.com`
- Password: `admin123456`

## 📋 Manual Setup (If Scripts Don't Work)

### Step 1: Setup Database

```bash
cd backend
node scripts/setupDatabase.js
```

This creates:
- Admin user (admin@insapi.com / admin123456)
- Default navigation menu
- Database collections

### Step 2: Start Servers

You need **3 terminals**:

**Terminal 1 - Node.js Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Python Backend:**
```bash
cd backend
python server.py
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 3: Access Admin Panel

1. Open: http://localhost:5173/fast-admin
2. Login with admin@insapi.com / admin123456
3. Start editing!

## 🎯 Features You Can Now Use

### 1. Navigation Manager
- Add/edit/delete menu items
- Create dropdown menus
- Reorder items
- Configure logo and contact info
- Toggle visibility

**How to use:**
1. Go to Admin Panel → Navigation tab
2. Click "Add Item" or edit existing items
3. Configure settings (logo, email, phone)
4. Click "Save Changes"

### 2. Page Manager
- Convert static React pages to editable
- Manage all pages
- Publish/unpublish
- Delete pages

**How to use:**
1. Go to Admin Panel → Page Manager tab
2. Find static page (e.g., "Home Page")
3. Click "Make Editable"
4. Click "Edit" to customize in page builder

### 3. Page Builder
- Drag-and-drop interface
- 12+ widget types
- Visual editing
- Responsive design
- Save and publish

**How to use:**
1. Go to Admin Panel → Page Builder tab
2. Select a page
3. Drag widgets from library
4. Configure properties
5. Save and publish

### 4. Media Library
- Upload images
- Manage files
- Copy URLs
- Delete files

**How to use:**
1. Go to Admin Panel → Media Library tab
2. Click "Upload File"
3. Select image
4. Image appears and is usable

## 🔧 What Was Fixed

### Issue 1: Navigation Not Saving
**Problem:** Token authentication failing

**Fix:**
- Added token extraction middleware
- Token now works from query params
- All routes properly authenticated

**Files changed:**
- `backend/routes/navigation.js`

### Issue 2: Page Conversion Failing
**Problem:** Token authentication failing

**Fix:**
- Added token extraction middleware
- Proper error handling
- Token validation improved

**Files changed:**
- `backend/routes/pages.js`

### Issue 3: Images Not Showing
**Problem:** 
- Wrong upload directory path
- Static files not served
- Incorrect URLs

**Fix:**
- Fixed upload directory to use relative path
- Mounted static files properly
- Updated URLs to correct server address

**Files changed:**
- `backend/server.py`

## 📁 New Files Created

### Scripts
- `backend/scripts/setupDatabase.js` - Complete database setup
- `backend/scripts/ensureAdmin.js` - Ensure admin user exists
- `start-all.sh` - Start all servers (Linux/Mac)
- `start-all.bat` - Start all servers (Windows)
- `stop-all.sh` - Stop all servers (Linux/Mac)

### Documentation
- `TROUBLESHOOTING_FIXES.md` - Detailed troubleshooting
- `README_FIXES.md` - This file

## 🧪 Testing

### Test Navigation Manager
1. Login to admin panel
2. Go to Navigation tab
3. Update contact email to "test@example.com"
4. Click "Save Changes"
5. Should see "Navigation saved successfully"
6. Refresh page - changes should persist

### Test Page Manager
1. Go to Page Manager tab
2. Find "Home Page" in static pages
3. Click "Make Editable"
4. Should see success message
5. Page moves to "Editable Pages" section

### Test Image Upload
1. Go to Media Library tab
2. Click "Upload File"
3. Select any image
4. Should see image preview immediately
5. Image should be visible and clickable

### Test Page Builder
1. Go to Page Builder tab
2. Select converted page
3. Drag "Heading" widget to canvas
4. Edit text in properties panel
5. Click "Save"
6. Should see success message

## 🔑 Admin Credentials

**Default credentials:**
- Email: `admin@insapi.com`
- Password: `admin123456`

**⚠️ IMPORTANT:** Change password after first login!

To change password:
1. Login to admin panel
2. Go to Settings tab
3. Update password
4. Save changes

## 🌐 Server Ports

- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/fast-admin
- **Node.js API:** http://localhost:5001
- **Python API:** http://localhost:8000
- **MongoDB:** mongodb://localhost:27017

## 📊 Database Collections

After setup, you'll have:

- **users** - Admin users
- **navigations** - Menu structure
- **pages** - Page content
- **contents** - Legacy content
- **contacts** - Form submissions
- **clients** - Client logos
- **portfolios** - Portfolio items

## 🐛 Common Issues

### "Failed to save navigation"
**Solution:** 
1. Logout and login again
2. Run: `node backend/scripts/setupDatabase.js`
3. Check MongoDB is running

### "Failed to convert page"
**Solution:**
1. Check if page already converted
2. Logout and login again
3. Check both servers are running

### Images not showing
**Solution:**
1. Ensure Python server is running
2. Check uploads directory exists
3. Try accessing: http://localhost:8000/uploads/

### MongoDB connection error
**Solution:**
```bash
# Start MongoDB
mongod
# or
sudo systemctl start mongod
```

### Port already in use
**Solution:**
```bash
# Linux/Mac
./stop-all.sh

# Windows
# Close all terminal windows running servers
```

## 📝 Environment Variables

Create `backend/.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/marketing-site

# JWT
JWT_SECRET=your-secret-key-change-this-in-production

# Server
PORT=5001

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@insapi.com
```

## 🎨 Making Everything Editable

### Convert All Static Pages

Run this in admin panel:

1. Go to Page Manager
2. For each static page:
   - Click "Make Editable"
   - Wait for success message
   - Click "Edit" to customize

Static pages to convert:
- Home
- Services
- Content Marketing
- Google Ads
- Meta Ads
- Shopify Development
- Social Media Marketing
- Branding & PR

### Customize Navigation

1. Go to Navigation tab
2. Update logo URL
3. Update contact email/phone
4. Add/remove menu items
5. Create dropdowns
6. Save changes

### Edit Pages

1. Go to Page Builder tab
2. Select page
3. Add sections
4. Add widgets
5. Configure styles
6. Save and publish

## 🚀 Production Deployment

### Before deploying:

1. **Change admin password**
2. **Update JWT_SECRET** in .env
3. **Configure SMTP** for emails
4. **Update API URLs** in frontend
5. **Setup MongoDB Atlas** or production DB
6. **Configure CORS** properly
7. **Enable HTTPS**
8. **Setup backups**

### Environment variables for production:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=very-long-random-secret-key
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## 📚 Documentation

- `FEATURE_SUMMARY.md` - Overview of features
- `SETUP_INSTRUCTIONS.md` - Detailed setup
- `NAVIGATION_AND_PAGE_MANAGEMENT_GUIDE.md` - Complete guide
- `TROUBLESHOOTING_FIXES.md` - Troubleshooting
- `QUICK_REFERENCE.md` - Quick reference
- `ARCHITECTURE.md` - System architecture

## ✅ Success Checklist

After setup, verify:

- [ ] Admin login works
- [ ] Navigation tab loads
- [ ] Can save navigation changes
- [ ] Page Manager tab loads
- [ ] Can convert static pages
- [ ] Can edit converted pages
- [ ] Media Library tab loads
- [ ] Can upload images
- [ ] Images display correctly
- [ ] Page Builder works
- [ ] Can save pages
- [ ] Can publish pages
- [ ] Frontend shows changes

## 🎉 You're Done!

You now have a fully functional WordPress/Elementor-like CMS!

Everything is editable from the admin panel:
- ✅ Navigation menus
- ✅ Page content
- ✅ Images and media
- ✅ Settings
- ✅ No code changes needed!

**Happy editing! 🚀**

## 💬 Support

If you encounter issues:
1. Check `TROUBLESHOOTING_FIXES.md`
2. Verify all servers are running
3. Check MongoDB is running
4. Check browser console for errors
5. Check server logs for errors

## 📞 Quick Commands

```bash
# Setup everything
node backend/scripts/setupDatabase.js

# Start all servers (Linux/Mac)
./start-all.sh

# Start all servers (Windows)
start-all.bat

# Stop all servers (Linux/Mac)
./stop-all.sh

# Check MongoDB
mongosh
use marketing-site
db.users.find()

# Test Node.js server
curl http://localhost:5001/api/health

# Test Python server
curl http://localhost:8000/api/health
```

## 🎯 Next Steps

1. Run setup script
2. Start all servers
3. Login to admin panel
4. Convert static pages
5. Customize navigation
6. Upload images
7. Edit pages
8. Publish changes
9. Test on frontend
10. Deploy to production

**Everything is now editable from the dashboard! 🎨**
