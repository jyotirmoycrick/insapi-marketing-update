# Image Editing Guide - How It Works

## Overview

All images across your website (home page and all service pages) are now editable when you're logged in as admin. Changes are **automatically saved** to the database and are **immediately live** - no separate "Save" or "Publish" button needed.

## How Image Editing Works

### 1. Login as Admin
- Username: `malo`
- Password: `1234567890`
- Your admin session is stored in localStorage as `admin_token`

### 2. Navigate to Any Page
All these pages have editable images:
- **Home Page**: `/`
- **Google Ads**: `/services/google-ads`
- **Meta Ads**: `/services/meta-ads`
- **Social Media**: `/services/social-media`
- **Content Marketing**: `/services/content-marketing`
- **Shopify**: `/services/shopify`
- **Build a Brand**: `/services/build-a-brand`

### 3. Edit Images
When logged in as admin:

1. **Hover over any image** - You'll see a yellow badge "🖼️ Hover to edit"
2. **Hover to reveal controls** - Two buttons appear:
   - **"Change Image"** (Blue) - Upload a new image
   - **"Remove"** (Red) - Remove the current image

3. **Click "Change Image"**:
   - File picker opens
   - Select an image from your computer
   - Image uploads automatically
   - Toast notification: "Uploading image..."
   - On success: "✅ Image saved successfully! Changes are live."
   - Image updates immediately on the page

4. **Click "Remove"**:
   - Confirmation dialog appears
   - If confirmed, image is removed
   - Toast notification: "✅ Image removed successfully! Changes are live."
   - Placeholder appears (only visible to admin)

## Auto-Save Behavior

**IMPORTANT**: There is NO separate "Save" or "Publish" button because:

1. **Images save automatically** when you upload them
2. **Changes are immediately live** for all visitors
3. **Data is stored in MongoDB** in the `content` collection
4. **No draft mode** - all changes are instant

### Database Structure
```javascript
{
  page: "home",           // Which page (home, google-ads, etc.)
  section: "hero-section", // Which section
  key: "image-0",         // Unique image identifier
  value: "http://localhost:8000/uploads/abc123.png", // Image URL
  type: "image",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Visual Feedback

### Toast Notifications
- **Loading**: "Uploading image..." (with spinner)
- **Success**: "✅ Image saved successfully! Changes are live."
- **Error**: "❌ Failed to upload image"

### Hover States
- **Not hovering**: Yellow badge "🖼️ Hover to edit"
- **Hovering**: Dark overlay with action buttons
- **Uploading**: Button shows "Uploading..." and is disabled

## Technical Details

### Frontend Components
- **EditableImage**: Main component for image editing
  - Location: `frontend/src/components/EditableImage.tsx`
  - Props: `src`, `alt`, `imageKey`, `page`, `section`, `onImageChange`
  - Auto-syncs with parent state via `useEffect`

### Backend API Endpoints
- **POST /api/upload**: Upload image file
  - Saves to `backend/uploads/`
  - Returns image URL
  
- **POST /api/content**: Save/update content
  - Stores image URL in MongoDB
  - Links image to specific page/section/key

- **GET /api/content?page={page}**: Get all content for a page
  - Loads saved images on page load

### Image Storage
- **Uploaded files**: `backend/uploads/` directory
- **Database**: MongoDB `content` collection
- **URL format**: `http://localhost:8000/uploads/{filename}`

## Troubleshooting

### Images Not Showing After Upload
1. Check browser console for errors
2. Verify backend is running on port 8000
3. Check MongoDB connection
4. Verify `admin_token` exists in localStorage

### Can't Edit Images
1. Make sure you're logged in as admin
2. Check that `isEditMode` is true in AdminContext
3. Verify `admin_token` in localStorage

### Changes Not Persisting
1. Check backend logs for errors
2. Verify MongoDB is running
3. Check network tab for failed API calls
4. Ensure `admin_token` is valid

## Testing Checklist

- [ ] Login as admin
- [ ] Navigate to home page
- [ ] Hover over hero image - see edit controls
- [ ] Upload new image - see success toast
- [ ] Refresh page - image persists
- [ ] Navigate to Google Ads page
- [ ] Edit images on Google Ads page
- [ ] Test all service pages
- [ ] Remove an image - see placeholder
- [ ] Upload image to replace placeholder
- [ ] Logout - images still visible but not editable
- [ ] Login again - can edit images again

## Pages with Editable Images

### Home Page Components
- HeroSection
- AboutSection
- ServicesSection
- PerformanceSection
- WhyChooseSection
- CertificationsSection
- ClientsSection
- PartnersSection
- FAQSection
- ReadyToGrowSection
- BusinessGrowthSection
- MarqueeSection

### Service Pages
Each service page has multiple sections with editable images:
- Hero sections
- Feature sections
- Process sections
- FAQ sections
- CTA sections

## Summary

✅ **All images are editable** across all pages
✅ **Auto-save** - no manual save button needed
✅ **Instant publishing** - changes are immediately live
✅ **Visual feedback** - toast notifications confirm actions
✅ **Persistent** - images stored in MongoDB
✅ **Admin-only** - editing only visible when logged in

The system is designed for simplicity: hover, click, upload, done. No complex workflows or publishing steps required.
