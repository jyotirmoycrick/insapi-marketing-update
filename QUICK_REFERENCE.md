# Quick Reference Card

## 🚀 Getting Started (3 Steps)

```bash
# 1. Initialize navigation
cd backend && node scripts/initializeNavigation.js

# 2. Start servers (3 terminals)
cd backend && npm start                    # Terminal 1
cd backend && python server.py             # Terminal 2
cd frontend && npm run dev                 # Terminal 3

# 3. Login to admin
# Open: http://localhost:5173/fast-admin
```

## 🎯 Common Tasks

### Add Menu Item
1. Admin Panel → Navigation tab
2. Click "Add Item"
3. Fill: Label, Path, Type
4. Click "Save Changes"

### Create Dropdown Menu
1. Add/Edit menu item
2. Set Type = "Dropdown"
3. Click expand icon (▼)
4. Click "Add Sub-item"
5. Fill sub-item details
6. Click "Save Changes"

### Convert Static Page to Editable
1. Admin Panel → Page Manager tab
2. Find page in "Static React Pages"
3. Click "Make Editable"
4. Click "Edit" to customize
5. Save and Publish

### Edit Existing Page
1. Admin Panel → Page Manager tab
2. Click edit icon (✏️) on page
3. Modify in Page Builder
4. Click "Save"

### Publish/Unpublish Page
1. Admin Panel → Page Manager tab
2. Click eye icon (👁️) on page
3. Status toggles automatically

### Reorder Menu Items
1. Admin Panel → Navigation tab
2. Use ↑↓ arrows on items
3. Click "Save Changes"

### Update Logo
1. Admin Panel → Navigation tab
2. Update "Logo URL" field
3. Click "Save Changes"

### Update Contact Info
1. Admin Panel → Navigation tab
2. Update Email/Phone fields
3. Toggle "Show Contact Info"
4. Click "Save Changes"

## 📁 File Locations

### Backend
```
backend/models/Navigation.js       # Navigation model
backend/models/Page.js             # Page model
backend/routes/navigation.js       # Navigation API
backend/routes/pages.js            # Pages API
backend/scripts/initializeNavigation.js  # Setup script
```

### Frontend
```
frontend/src/components/admin/NavigationManager.tsx  # Nav UI
frontend/src/components/admin/PageManager.tsx        # Page UI
frontend/src/app/components/DynamicHeader.tsx        # Dynamic nav
```

## 🔌 API Quick Reference

### Navigation
```
GET    /api/navigation/main-menu              # Get nav (public)
PUT    /api/navigation/main-menu?token=xxx    # Update nav (admin)
POST   /api/navigation/main-menu/items?token=xxx  # Add item (admin)
DELETE /api/navigation/main-menu/items/:id?token=xxx  # Delete (admin)
```

### Pages
```
GET    /api/pages                             # List pages
GET    /api/pages/:id                         # Get page
POST   /api/pages?token=xxx                   # Create (admin)
PUT    /api/pages/:id?token=xxx               # Update (admin)
DELETE /api/pages/:id?token=xxx               # Delete (admin)
PATCH  /api/pages/:id/publish?token=xxx       # Publish (admin)
POST   /api/pages/:id/convert-to-editable?token=xxx  # Convert (admin)
```

## 🎨 Menu Item Types

| Type | Description | Use Case |
|------|-------------|----------|
| Link | Simple link | Regular pages |
| Dropdown | Has sub-items | Services menu |
| Button | Styled button | CTA links |

## 📊 Page Types

| Type | Description | Editable |
|------|-------------|----------|
| static | Hardcoded React | No (convert first) |
| builder | Page builder | Yes |
| dynamic | CMS-based | Yes |

## 🔑 Admin Access

**Login URL**: `http://localhost:5173/fast-admin`

**Default Credentials**: (Set in your system)
- Username: `malo`
- Password: `1234567890`

**Token Location**: `localStorage.getItem('admin_token')`

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Navigation not showing | Run `node scripts/initializeNavigation.js` |
| Changes not saving | Check admin token, verify login |
| API errors | Ensure both servers running (Node + Python) |
| Static pages not converting | Check MongoDB connection |
| Menu not updating | Clear browser cache, refresh |

## 📱 Testing Checklist

- [ ] Navigation loads from database
- [ ] Can add/edit/delete menu items
- [ ] Dropdowns work
- [ ] Can convert static pages
- [ ] Can edit converted pages
- [ ] Publish/unpublish works
- [ ] Mobile menu works
- [ ] Contact info displays
- [ ] Logo displays
- [ ] All links work

## 🔄 Update Frontend Navigation

Replace in `App.tsx`:
```tsx
// Old
import { Header } from '@/app/components/Header';
<Header />

// New  
import { DynamicHeader } from '@/app/components/DynamicHeader';
<DynamicHeader />
```

## 💾 Database Collections

```javascript
// navigations collection
{
  name: "main-menu",
  items: [...],
  settings: {...}
}

// pages collection
{
  page_id: "home",
  page_name: "Home Page",
  route: "/",
  sections: [...],
  is_published: true
}
```

## 🎯 Static Pages to Convert

- [ ] Home (`/`)
- [ ] Services (`/services`)
- [ ] Content Marketing (`/content-marketing`)
- [ ] Google Ads (`/google-ads`)
- [ ] Meta Ads (`/meta-ads`)
- [ ] Shopify Development (`/shopify-development`)
- [ ] Social Media Marketing (`/social-media-marketing`)
- [ ] Branding & PR (`/branding-pr`)

## 📞 Support Resources

- `FEATURE_SUMMARY.md` - Overview
- `SETUP_INSTRUCTIONS.md` - Detailed setup
- `NAVIGATION_AND_PAGE_MANAGEMENT_GUIDE.md` - Complete guide
- `IMPLEMENTATION_CHECKLIST.md` - Implementation steps

## ⚡ Quick Commands

```bash
# Initialize
node backend/scripts/initializeNavigation.js

# Start all servers
npm start --prefix backend &
python backend/server.py &
npm run dev --prefix frontend

# Check MongoDB
mongosh
use marketing-site
db.navigations.find()
db.pages.find()
```

## 🎉 You're Done!

You now have WordPress-like functionality:
- ✅ Manage navigation from admin panel
- ✅ Edit existing React pages
- ✅ Add/remove pages from navbar
- ✅ All without touching code!

**Happy editing! 🚀**
