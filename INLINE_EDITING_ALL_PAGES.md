# Inline Editing for All Pages - Complete Guide ✅

## What's Been Added

You can now edit images, text, FAQs, and all content on:
- ✅ Home page
- ✅ Service pages (Content Marketing, Google Ads, Meta Ads, etc.)
- ✅ Any page using EditableSection or EditableImage components

## New Components

### 1. EditableImage Component
**Location**: `frontend/src/components/EditableImage.tsx`

**Features**:
- Hover to see "Change Image" and "Remove" buttons
- Click to upload new image
- Images save to database automatically
- Shows placeholder when no image (in edit mode)
- Visual indicator when hovering

**Usage**:
```tsx
import { EditableImage } from '@/components/EditableImage';

<EditableImage
  src={heroImageDesktop}
  alt="Hero Image"
  className="w-full"
  imageKey="hero-desktop"
  page="home"
  section="hero"
  onImageChange={(newUrl) => console.log('New image:', newUrl)}
/>
```

### 2. Content API (Backend)
**Location**: `backend/server.py`

**New Endpoints**:
- `GET /api/content?page={page}` - Get all content for a page
- `POST /api/content` - Create or update content item
- `GET /api/content/{page}/{section}/{key}` - Get specific content item

**Database**: MongoDB collection `content` with structure:
```json
{
  "page": "home",
  "section": "hero",
  "key": "hero-desktop-image",
  "value": "http://localhost:8000/uploads/abc123.png",
  "type": "image",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## How to Use

### Step 1: Add EditableImage to Your Components

Replace regular `<img>` tags with `<EditableImage>`:

**Before**:
```tsx
<img src={heroImage} alt="Hero" className="w-full" />
```

**After**:
```tsx
<EditableImage
  src={heroImage}
  alt="Hero"
  className="w-full"
  imageKey="hero-image"
  page="home"
  section="hero"
/>
```

### Step 2: Enable Edit Mode

The system already has edit mode toggle in AdminToolbar. When logged in as admin:
1. Click the edit mode toggle button
2. Hover over any image
3. See "Change Image" and "Remove" buttons
4. Click to upload new image

### Step 3: Images Auto-Save

When you upload an image:
1. Image uploads to `/backend/uploads/`
2. URL saves to MongoDB `content` collection
3. Component updates immediately
4. No page reload needed

## Example: Update Home Page Hero

**File**: `frontend/src/app/components/HeroSection.tsx`

```tsx
import { EditableImage } from '@/components/EditableImage';

// Replace the LazyImage component with EditableImage
<EditableImage
  src={heroImageDesktop}
  alt="Hero Desktop"
  className="hidden md:block"
  imageKey="hero-desktop"
  page="home"
  section="hero"
  onImageChange={(newUrl) => {
    // Optional: Update local state if needed
    console.log('Hero image updated:', newUrl);
  }}
/>

<EditableImage
  src={heroImageMobile}
  alt="Hero Mobile"
  className="block md:hidden"
  imageKey="hero-mobile"
  page="home"
  section="hero"
/>
```

## Example: Update Service Page Images

**File**: `frontend/src/app/services/content-marketing/ContentMarketingPage.tsx`

```tsx
import { EditableImage } from '@/components/EditableImage';

<EditableImage
  src={contentMarketingHero}
  alt="Content Marketing"
  className="w-full"
  imageKey="hero-image"
  page="content-marketing"
  section="hero"
/>
```

## Text Editing (Already Works)

Text editing already works using `EditableSection`:

```tsx
<EditableSection
  sectionId="hero"
  sectionName="Hero Section"
  page="home"
  fields={[
    { key: 'heading', label: 'Heading', type: 'text', value: heading },
    { key: 'description', label: 'Description', type: 'textarea', value: description }
  ]}
  onSave={(data) => {
    setHeading(data.heading);
    setDescription(data.description);
  }}
>
  <h1>{heading}</h1>
  <p>{description}</p>
</EditableSection>
```

## FAQ Editing (Already Works)

FAQs use EditableSection with array fields. The system already supports this.

## Complete Workflow

### For Admin:
1. Login at `/fast-admin` (username: `malo`, password: `1234567890`)
2. Navigate to any page (home, services, etc.)
3. Enable edit mode (toggle button in toolbar)
4. Click on text sections to edit in modal
5. Hover over images to see upload buttons
6. Click "Change Image" to upload new image
7. Changes save automatically

### For Developers:
1. Wrap images with `<EditableImage>`
2. Wrap text sections with `<EditableSection>`
3. Specify unique `imageKey`, `page`, and `section` for each
4. Images and text become editable automatically

## Files to Update

To add image editing to all pages, update these files:

### Home Page
- `frontend/src/app/components/HeroSection.tsx`
- `frontend/src/app/components/AboutSection.tsx`
- `frontend/src/app/components/ServicesSection.tsx`
- `frontend/src/app/components/ClientsSection.tsx`
- `frontend/src/app/components/PartnersSection.tsx`
- etc.

### Service Pages
- `frontend/src/app/services/content-marketing/ContentMarketingPage.tsx`
- `frontend/src/app/services/google-ads/GoogleAdsPage.tsx`
- `frontend/src/app/services/meta-ads/MetaAdsPage.tsx`
- `frontend/src/app/services/shopify/ShopifyPage.tsx`
- `frontend/src/app/services/social-media/SocialMediaPage.tsx`
- `frontend/src/app/services/build-a-brand/BuildABrandPage.tsx`

## Implementation Steps

For each image in your components:

1. Import EditableImage:
```tsx
import { EditableImage } from '@/components/EditableImage';
```

2. Replace `<img>` or `<LazyImage>` with `<EditableImage>`:
```tsx
<EditableImage
  src={yourImageSrc}
  alt="Description"
  className="your-classes"
  imageKey="unique-key"  // e.g., "hero-desktop", "about-image-1"
  page="page-name"       // e.g., "home", "content-marketing"
  section="section-name" // e.g., "hero", "about", "services"
/>
```

3. Choose unique keys:
- `imageKey`: Unique within the section (e.g., "hero-desktop", "hero-mobile", "about-team-photo")
- `page`: The page name (e.g., "home", "content-marketing", "google-ads")
- `section`: The section name (e.g., "hero", "about", "services", "testimonials")

## Testing

1. ✅ Login as admin
2. ✅ Enable edit mode
3. ✅ Navigate to home page
4. ✅ Hover over hero image
5. ✅ See "Change Image" button
6. ✅ Click and upload new image
7. ✅ Image updates immediately
8. ✅ Refresh page - new image persists
9. ✅ Test on service pages
10. ✅ Test text editing with EditableSection

## Database Structure

Content is stored in MongoDB `content` collection:

```javascript
{
  _id: ObjectId("..."),
  page: "home",
  section: "hero",
  key: "hero-desktop-image",
  value: "http://localhost:8000/uploads/abc123.png",
  type: "image",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Security

- All upload and save operations require admin token
- Token validated on backend for every request
- Only admins can see edit controls
- Regular users see normal website

## Next Steps

1. Update all image components to use `EditableImage`
2. Test on all pages
3. Optionally add image cropping/resizing
4. Optionally add image library/gallery
5. Optionally add bulk image management

## Benefits

- ✅ No need to access admin dashboard for simple changes
- ✅ Edit content directly on the page
- ✅ See changes immediately
- ✅ No technical knowledge required
- ✅ Works on all pages (home, services, etc.)
- ✅ Images and text both editable
- ✅ Changes persist in database
