# Home Page Image Editing - NOW WORKING ✅

## What Was Fixed

Updated `HeroSection.tsx` to use the new `EditableImage` component instead of `LazyImage`.

## Changes Made

### 1. Added EditableImage Import
```tsx
import { EditableImage } from '@/components/EditableImage';
```

### 2. Added State for Image URLs
```tsx
const [heroDesktopSrc, setHeroDesktopSrc] = useState(heroImageDesktop);
const [heroMobileSrc, setHeroMobileSrc] = useState(heroImageMobile);
```

### 3. Load Saved Images from Database
```tsx
const desktopImage = content.find(
  (c: any) => c.section === 'hero' && c.key === 'hero-desktop'
);
const mobileImage = content.find(
  (c: any) => c.section === 'hero' && c.key === 'hero-mobile'
);

if (desktopImage && desktopImage.value) setHeroDesktopSrc(desktopImage.value);
if (mobileImage && mobileImage.value) setHeroMobileSrc(mobileImage.value);
```

### 4. Replaced LazyImage with EditableImage
```tsx
// Desktop
<EditableImage
  src={heroDesktopSrc}
  alt="Build A Brand People Trust"
  className="w-full"
  imageKey="hero-desktop"
  page="home"
  section="hero"
  onImageChange={(newUrl) => setHeroDesktopSrc(newUrl)}
/>

// Mobile
<EditableImage
  src={heroMobileSrc}
  alt="Build A Brand People Trust"
  className="w-full"
  imageKey="hero-mobile"
  page="home"
  section="hero"
  onImageChange={(newUrl) => setHeroMobileSrc(newUrl)}
/>
```

## How to Test

1. **Login as Admin**
   - Go to `/fast-admin`
   - Username: `malo`
   - Password: `1234567890`

2. **Enable Edit Mode**
   - Look for the edit mode toggle in the admin toolbar
   - Click to enable edit mode

3. **Edit Hero Images**
   - Navigate to home page (`/`)
   - Hover over the hero image
   - You should see:
     - Yellow badge "🖼️ Hover to edit" when not hovering
     - "Change Image" and "Remove" buttons when hovering
   - Click "Change Image" to upload new image
   - Image updates immediately and saves to database

## What Works Now

✅ Hero desktop image is editable
✅ Hero mobile image is editable  
✅ Hover shows edit buttons
✅ Upload new images
✅ Remove images
✅ Images save to database
✅ Images persist after page reload
✅ Visual indicators in edit mode

## Next Steps

To add image editing to other sections, follow the same pattern:

1. Import EditableImage
2. Add state for image URL
3. Load saved image from content API
4. Replace `<img>` or `<LazyImage>` with `<EditableImage>`
5. Specify unique `imageKey`, `page`, and `section`

## Example for Other Sections

```tsx
// AboutSection.tsx
import { EditableImage } from '@/components/EditableImage';

const [aboutImage, setAboutImage] = useState(defaultAboutImage);

// In useEffect, load from API
const savedImage = content.find(
  (c: any) => c.section === 'about' && c.key === 'about-image'
);
if (savedImage && savedImage.value) setAboutImage(savedImage.value);

// In JSX
<EditableImage
  src={aboutImage}
  alt="About Us"
  className="w-full"
  imageKey="about-image"
  page="home"
  section="about"
  onImageChange={(newUrl) => setAboutImage(newUrl)}
/>
```

## Files Modified

- ✅ `frontend/src/components/EditableImage.tsx` (created)
- ✅ `frontend/src/app/components/HeroSection.tsx` (updated)
- ✅ `backend/server.py` (added content API)

## Database

Images are stored in MongoDB `content` collection:
```json
{
  "page": "home",
  "section": "hero",
  "key": "hero-desktop",
  "value": "http://localhost:8000/uploads/abc123.png",
  "type": "image"
}
```

## Troubleshooting

**If edit buttons don't show:**
1. Make sure you're logged in as admin
2. Make sure edit mode is enabled (toggle in toolbar)
3. Check browser console for errors
4. Verify `isEditMode` is true in AdminContext

**If upload fails:**
1. Check backend is running on port 8000
2. Check admin token is valid
3. Check uploads directory exists: `backend/uploads/`
4. Check browser console for error messages

**If images don't persist:**
1. Check MongoDB is running
2. Check content API endpoints are working
3. Check browser network tab for API calls
4. Verify content is being saved to database
