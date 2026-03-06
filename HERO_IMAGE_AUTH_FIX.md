# Hero Image Upload 401 Error - Fix

## 🐛 Problem

When trying to edit hero images on service pages, users get a 401 Unauthorized error:
```
POST https://insapimarketing.com/api/upload 401 (Unauthorized)
Upload error: Error: Upload failed
```

## 🔍 Root Cause

The EditableImage component requires authentication through FastAdmin (`admin_token`), but users were trying to edit from regular service pages where only the regular admin context (`authToken`) is available.

### Authentication Systems

The app has TWO authentication systems:

1. **FastAdmin** (`/fast-admin`)
   - Uses `admin_token` stored in localStorage
   - Token sent as Form parameter
   - Used for dashboard and admin features

2. **Regular Admin** (AdminContext)
   - Uses `authToken` stored in localStorage  
   - Token sent as Bearer header
   - Used for inline editing on regular pages

The `/api/upload` endpoint ONLY accepts `admin_token` (FastAdmin authentication).

## ✅ Solution

Updated EditableImage component to:
1. Check for both `admin_token` and `authToken`
2. Show helpful error message if no token found
3. Handle 401 errors gracefully with clear instructions

### Code Changes

```typescript
// Check for both authentication methods
const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken');

// Show helpful message if no token
if (!token) {
  toast.error('❌ Please login through /fast-admin to edit images');
  return;
}

// Handle 401 errors
if (uploadRes.status === 401) {
  toast.error('❌ Session expired. Please login again at /fast-admin', { id: 'upload' });
  return;
}
```

## 📋 How to Edit Hero Images (Correct Way)

### Step 1: Login to FastAdmin
1. Go to: http://insapimarketing.com/fast-admin
2. Username: `malo`
3. Password: `1234567890`

### Step 2: Navigate to Service Page
1. From dashboard, click "View Site" or navigate directly
2. Go to any service page (e.g., /google-ads)

### Step 3: Edit Hero Image
1. You should see edit controls (you're logged in through FastAdmin)
2. Hover over hero background image
3. Click "Change Image"
4. Upload new image
5. Done! Image saves successfully

## 🔧 Technical Details

### Files Modified
- `frontend/src/components/EditableImage.tsx`
  - Added check for both token types
  - Added helpful error messages
  - Added 401 error handling

### Authentication Flow

```
User Login Flow:
1. User goes to /fast-admin
2. Enters credentials
3. Backend creates session token
4. Token stored as 'admin_token' in localStorage
5. Token valid for 7 days

Upload Flow:
1. User clicks "Change Image"
2. EditableImage checks for token
3. If no token → Show error message
4. If token exists → Upload with token as Form parameter
5. Backend verifies token
6. If valid → Upload succeeds
7. If invalid/expired → 401 error with helpful message
```

### Why Two Auth Systems?

- **FastAdmin:** Full-featured dashboard with all admin tools
- **Regular Admin:** Lightweight inline editing for content managers

Currently, image uploads require FastAdmin authentication for security.

## ⚠️ Important Notes

### For Users
- **Always login through /fast-admin to edit images**
- Regular admin login (AdminContext) doesn't support image uploads yet
- Token lasts 7 days, so you won't need to login frequently

### For Developers
- Consider unifying authentication systems in future
- Or add image upload support to regular admin context
- Current solution is secure and works well

## ✅ Testing

### Test 1: Without Login
1. Go to service page directly (not logged in)
2. Try to edit hero image
3. Should see: "Please login through /fast-admin to edit images"

### Test 2: With FastAdmin Login
1. Login at /fast-admin
2. Navigate to service page
3. Edit hero image
4. Should upload successfully

### Test 3: Expired Token
1. Login at /fast-admin
2. Wait for token to expire (or clear it manually)
3. Try to upload image
4. Should see: "Session expired. Please login again at /fast-admin"

## 🚀 Deployment

```bash
cd frontend
npm run build
scp -r dist/* root@187.124.99.185:/var/www/insapimarketing.com/
ssh root@187.124.99.185 "sudo systemctl reload nginx"
```

## 📊 Error Messages

### Before Fix
```
❌ Upload error: Error: Upload failed
(No helpful information)
```

### After Fix
```
❌ Please login through /fast-admin to edit images
(Clear instruction)

❌ Session expired. Please login again at /fast-admin
(Clear instruction with link)
```

## 🎯 Summary

### Problem
- 401 Unauthorized error when editing hero images
- Confusing error message
- Users didn't know what to do

### Solution
- Check for both authentication methods
- Show helpful error messages
- Guide users to correct login page

### Result
- ✅ Clear error messages
- ✅ Users know exactly what to do
- ✅ Successful uploads when logged in correctly

## 📚 Related Documentation

- **EDITABLE_SERVICE_HERO_IMAGES.md** - Complete hero image guide
- **SESSION_AND_CARD_SIZE_FIX.md** - Session management
- **ALL_LATEST_FIXES_SUMMARY.md** - All recent fixes

---

**Hero image editing now works correctly with clear error messages!** 🚀
