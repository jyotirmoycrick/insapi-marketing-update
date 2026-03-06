# Navigation and Page Management System

## Overview
This guide explains the new features added to enable editing existing React pages and managing navigation from the backend admin panel, similar to WordPress.

## Features Added

### 1. Navigation Management System

#### Backend Components
- **Model**: `backend/models/Navigation.js`
  - Stores navigation menu items with support for dropdowns
  - Configurable logo, contact info, and menu settings
  - Supports visibility toggles and ordering

- **API Routes**: `backend/routes/navigation.js`
  - `GET /api/navigation/:name` - Get navigation (public)
  - `PUT /api/navigation/:name` - Update navigation (admin)
  - `POST /api/navigation/:name/items` - Add menu item (admin)
  - `PUT /api/navigation/:name/items/:itemId` - Update menu item (admin)
  - `DELETE /api/navigation/:name/items/:itemId` - Delete menu item (admin)
  - `POST /api/navigation/:name/reorder` - Reorder menu items (admin)

#### Frontend Components
- **NavigationManager**: `frontend/src/components/admin/NavigationManager.tsx`
  - Visual interface to manage navigation items
  - Drag-and-drop reordering
  - Add/edit/delete menu items
  - Support for dropdowns with sub-items
  - Configure logo and contact information
  - Toggle visibility of menu items

- **DynamicHeader**: `frontend/src/app/components/DynamicHeader.tsx`
  - Fetches navigation from backend API
  - Renders menu dynamically based on database content
  - Supports dropdowns, regular links, and button-style links
  - Mobile-responsive with collapsible menu

### 2. Page Management System

#### Backend Components
- **Model**: `backend/models/Page.js`
  - Unified page model for all page types
  - Supports static, dynamic, and builder page types
  - Tracks editability status
  - Stores both sections (new format) and components (legacy format)

- **API Routes**: `backend/routes/pages.js`
  - `GET /api/pages` - Get all pages
  - `GET /api/pages/:identifier` - Get single page
  - `POST /api/pages` - Create new page (admin)
  - `PUT /api/pages/:page_id` - Update page (admin)
  - `DELETE /api/pages/:page_id` - Delete page (admin)
  - `PATCH /api/pages/:page_id/publish` - Publish/unpublish page (admin)
  - `POST /api/pages/:page_id/convert-to-editable` - Convert static page to editable (admin)

#### Frontend Components
- **PageManager**: `frontend/src/components/admin/PageManager.tsx`
  - Lists all pages (editable and static)
  - Shows static React pages that can be converted to editable
  - One-click conversion of static pages to page builder format
  - Publish/unpublish pages
  - Delete pages
  - Quick edit access

### 3. Admin Dashboard Integration

#### Updated Components
- **ImprovedAdminDashboard**: `frontend/src/components/admin/ImprovedAdminDashboard.tsx`
  - Added "Page Manager" tab
  - Added "Navigation" tab
  - Integrated NavigationManager and PageManager components

## How to Use

### Managing Navigation

1. **Access Navigation Manager**
   - Log in to admin panel at `/fast-admin`
   - Click on "Navigation" tab in sidebar

2. **Add Menu Items**
   - Click "Add Item" button
   - Enter label and path
   - Choose type: Link, Dropdown, or Button
   - Save changes

3. **Create Dropdowns**
   - Set item type to "Dropdown"
   - Click expand icon to show dropdown items
   - Click "Add Sub-item" to add children
   - Configure each sub-item's label and path

4. **Reorder Items**
   - Use up/down arrows to reorder menu items
   - Changes are saved when you click "Save Changes"

5. **Configure Settings**
   - Update logo URL and alt text
   - Set contact email and phone
   - Toggle contact info visibility

### Managing Pages

1. **Access Page Manager**
   - Log in to admin panel
   - Click on "Page Manager" tab

2. **Convert Static Pages to Editable**
   - Find the static page in "Static React Pages" section
   - Click "Make Editable" button
   - Page will be converted with a basic template
   - Edit the page in the Page Builder tab

3. **Edit Existing Pages**
   - Click "Edit" icon on any editable page
   - You'll be taken to the Page Builder
   - Make your changes and save

4. **Publish/Unpublish Pages**
   - Click the eye icon to toggle publish status
   - Published pages are visible to public
   - Unpublished pages are only visible to admins

5. **Delete Pages**
   - Click trash icon to delete a page
   - Confirm deletion (this cannot be undone)

### Using Dynamic Navigation in Frontend

To use the dynamic navigation in your app:

```tsx
import { DynamicHeader } from '@/app/components/DynamicHeader';

// Replace the old Header component with DynamicHeader
<DynamicHeader />
```

The DynamicHeader component will automatically fetch and render navigation from the backend.

## Database Schema

### Navigation Collection
```javascript
{
  name: "main-menu",
  items: [
    {
      label: "Home",
      path: "/",
      type: "link",
      order: 0,
      isVisible: true,
      openInNewTab: false,
      children: [] // For dropdown items
    }
  ],
  settings: {
    logo: "/path/to/logo.png",
    logoAlt: "Company Name",
    contactEmail: "info@company.com",
    contactPhone: "+91 1234567890",
    showContactInfo: true
  }
}
```

### Page Collection
```javascript
{
  page_id: "home",
  page_name: "Home Page",
  route: "/",
  type: "builder", // static, dynamic, or builder
  sections: [], // Page builder sections
  components: [], // Legacy components
  meta: {
    title: "Home - Company Name",
    description: "Welcome to our website"
  },
  is_published: true,
  is_editable: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## API Integration

### Backend Setup
The new routes are automatically integrated in `backend/index.js`:

```javascript
import navigationRoutes from './routes/navigation.js';
import pagesRoutes from './routes/pages.js';

app.use('/api/navigation', navigationRoutes);
app.use('/api/pages', pagesRoutes);
```

### Frontend API Calls
All API calls use the configured API_URL:

```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Fetch navigation
const res = await fetch(`${API_URL}/navigation/main-menu`);

// Update navigation (admin only)
const res = await fetch(`${API_URL}/navigation/main-menu?token=${token}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items, settings })
});
```

## Migration Guide

### Converting Existing Pages

1. **Identify Static Pages**
   - Home, Services, Content Marketing, Google Ads, Meta Ads, etc.
   - These are currently hardcoded React components

2. **Convert to Editable**
   - Go to Page Manager
   - Click "Make Editable" on each static page
   - A basic template will be created in the database

3. **Customize in Page Builder**
   - Edit the converted page in Page Builder
   - Add sections, containers, and widgets
   - Style and configure as needed
   - Publish when ready

4. **Update Frontend Routing** (Optional)
   - Replace static page components with PageRenderer
   - Or keep static components and use database for content only

### Updating Navigation

1. **Current Navigation**
   - Currently hardcoded in Header component
   - Services dropdown is manually defined

2. **Migrate to Dynamic**
   - Replace `<Header />` with `<DynamicHeader />`
   - Configure navigation in admin panel
   - Add all menu items and dropdowns
   - Save and test

## Best Practices

1. **Navigation**
   - Keep menu structure simple (max 2 levels)
   - Use clear, descriptive labels
   - Test on mobile devices
   - Maintain consistent ordering

2. **Pages**
   - Always preview before publishing
   - Use meaningful page IDs and routes
   - Set proper meta tags for SEO
   - Keep page structure organized

3. **Content Management**
   - Make regular backups
   - Test changes in unpublished state
   - Use descriptive names for pages
   - Document custom configurations

## Troubleshooting

### Navigation Not Updating
- Clear browser cache
- Check if changes were saved (click "Save Changes")
- Verify API endpoint is accessible
- Check browser console for errors

### Page Conversion Failed
- Ensure you're logged in as admin
- Check token is valid
- Verify database connection
- Check server logs for errors

### Static Pages Still Showing
- Ensure page is published
- Check route matches exactly
- Verify PageRenderer is being used
- Clear application cache

## Future Enhancements

Potential improvements:
- Mega menu support (3+ levels)
- Menu item icons
- Conditional menu items (show/hide based on user role)
- A/B testing for navigation
- Analytics integration
- Menu templates
- Import/export navigation
- Revision history for pages
- Page templates library
- Bulk page operations

## Support

For issues or questions:
1. Check this documentation
2. Review API responses in browser console
3. Check server logs for backend errors
4. Verify database collections exist
5. Test with admin credentials

## Summary

You now have a complete WordPress-like system for managing:
- ✅ Navigation menus with dropdowns
- ✅ Page creation and editing
- ✅ Converting static pages to editable
- ✅ Publishing/unpublishing pages
- ✅ Logo and contact info management
- ✅ Mobile-responsive navigation
- ✅ Admin panel integration

All manageable from the backend admin panel without touching code!
