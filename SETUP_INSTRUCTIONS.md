# Setup Instructions for Navigation & Page Management

## Quick Start

### 1. Install Dependencies (if not already done)

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Initialize Navigation in Database

Run this script to create the default navigation menu:

```bash
cd backend
node scripts/initializeNavigation.js
```

This will create a default navigation with:
- Home link
- Services dropdown (with all service pages)
- About, Blog, Contact links
- Logo and contact info settings

### 3. Start the Servers

```bash
# Terminal 1 - Backend (Node.js)
cd backend
npm start

# Terminal 2 - Backend (Python - for page builder)
cd backend
python server.py

# Terminal 3 - Frontend
cd frontend
npm run dev
```

### 4. Access Admin Panel

1. Go to `http://localhost:5173/fast-admin`
2. Login with your admin credentials
3. You'll see new tabs:
   - **Page Manager** - Manage all pages
   - **Navigation** - Edit menu items

## Features Overview

### Navigation Manager

Access at: Admin Panel → Navigation Tab

**What you can do:**
- ✅ Add/edit/delete menu items
- ✅ Create dropdown menus with sub-items
- ✅ Reorder menu items (drag or use arrows)
- ✅ Toggle visibility of menu items
- ✅ Configure logo and contact information
- ✅ Set menu item types (Link, Dropdown, Button)
- ✅ Open links in new tab option

**Example: Adding a new menu item**
1. Click "Add Item"
2. Enter label (e.g., "Portfolio")
3. Enter path (e.g., "/portfolio")
4. Choose type (Link, Dropdown, or Button)
5. Click "Save"
6. Click "Save Changes" to persist to database

**Example: Creating a dropdown**
1. Add or edit a menu item
2. Set type to "Dropdown"
3. Click the expand icon (chevron)
4. Click "Add Sub-item"
5. Fill in sub-item details
6. Save changes

### Page Manager

Access at: Admin Panel → Page Manager Tab

**What you can do:**
- ✅ View all pages (static and editable)
- ✅ Convert static React pages to editable format
- ✅ Publish/unpublish pages
- ✅ Delete pages
- ✅ Quick edit access to page builder
- ✅ View page details (route, type, status)

**Example: Converting a static page**
1. Find the page in "Static React Pages" section
2. Click "Make Editable"
3. Wait for conversion (creates basic template)
4. Click "Edit" to customize in page builder
5. Add sections, widgets, and content
6. Save and publish

### Using Dynamic Navigation

To use the new dynamic navigation in your frontend:

**Option 1: Replace existing Header**

In your `App.tsx` or layout component:

```tsx
// Old way
import { Header } from '@/app/components/Header';

// New way
import { DynamicHeader } from '@/app/components/DynamicHeader';

// In your component
<DynamicHeader />
```

**Option 2: Keep both (for testing)**

```tsx
import { Header } from '@/app/components/Header';
import { DynamicHeader } from '@/app/components/DynamicHeader';

// Use a flag to switch
const useDynamicNav = true;

{useDynamicNav ? <DynamicHeader /> : <Header />}
```

## Database Collections

After initialization, you'll have these collections:

### `navigations`
Stores menu configuration:
```javascript
{
  name: "main-menu",
  items: [...],
  settings: {...}
}
```

### `pages`
Stores page data:
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

## API Endpoints

### Navigation APIs
- `GET /api/navigation/main-menu` - Get navigation (public)
- `PUT /api/navigation/main-menu` - Update navigation (admin)
- `POST /api/navigation/main-menu/items` - Add item (admin)
- `PUT /api/navigation/main-menu/items/:id` - Update item (admin)
- `DELETE /api/navigation/main-menu/items/:id` - Delete item (admin)

### Page APIs
- `GET /api/pages` - Get all pages
- `GET /api/pages/:id` - Get single page
- `POST /api/pages` - Create page (admin)
- `PUT /api/pages/:id` - Update page (admin)
- `DELETE /api/pages/:id` - Delete page (admin)
- `PATCH /api/pages/:id/publish` - Publish/unpublish (admin)
- `POST /api/pages/:id/convert-to-editable` - Convert static page (admin)

## Testing

### Test Navigation Manager
1. Login to admin panel
2. Go to Navigation tab
3. Add a test menu item
4. Save changes
5. Visit frontend and verify menu appears
6. Test dropdown functionality
7. Test mobile menu

### Test Page Manager
1. Login to admin panel
2. Go to Page Manager tab
3. Convert a static page (e.g., "Home")
4. Edit the converted page
5. Add some content
6. Save and publish
7. Visit the page on frontend

### Test Dynamic Header
1. Make changes in Navigation Manager
2. Save changes
3. Refresh frontend
4. Verify changes appear immediately
5. Test all menu items work
6. Test mobile responsiveness

## Troubleshooting

### Navigation not showing
- Check if navigation was initialized: `node scripts/initializeNavigation.js`
- Verify MongoDB is running
- Check browser console for API errors
- Ensure DynamicHeader is being used

### Changes not saving
- Verify you're logged in as admin
- Check token is valid (not expired)
- Look for error messages in admin panel
- Check backend logs

### Static pages not converting
- Ensure backend is running
- Check admin token is valid
- Verify MongoDB connection
- Check server logs for errors

### API errors
- Verify both Node.js and Python servers are running
- Check MONGODB_URI in .env file
- Ensure ports are not in use (5001 for Node, 8000 for Python)
- Check CORS settings

## Environment Variables

Make sure these are set in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/marketing-site
JWT_SECRET=your-secret-key
PORT=5001
```

## Next Steps

1. **Initialize Navigation**
   ```bash
   cd backend
   node scripts/initializeNavigation.js
   ```

2. **Start Servers**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd backend && python server.py
   
   # Terminal 3
   cd frontend && npm run dev
   ```

3. **Login to Admin**
   - Go to http://localhost:5173/fast-admin
   - Login with admin credentials

4. **Configure Navigation**
   - Click "Navigation" tab
   - Customize menu items
   - Save changes

5. **Convert Pages**
   - Click "Page Manager" tab
   - Convert static pages to editable
   - Customize in page builder

6. **Update Frontend**
   - Replace Header with DynamicHeader
   - Test navigation
   - Deploy!

## Support

For detailed documentation, see:
- `NAVIGATION_AND_PAGE_MANAGEMENT_GUIDE.md` - Complete feature guide
- `backend/models/Navigation.js` - Navigation schema
- `backend/models/Page.js` - Page schema
- `frontend/src/components/admin/NavigationManager.tsx` - Navigation UI
- `frontend/src/components/admin/PageManager.tsx` - Page management UI

## Summary

You now have:
- ✅ WordPress-like navigation management
- ✅ Page management system
- ✅ Static page conversion
- ✅ Dynamic header component
- ✅ Admin panel integration
- ✅ Mobile-responsive menus
- ✅ Publish/unpublish functionality

All manageable from the admin panel without touching code!
