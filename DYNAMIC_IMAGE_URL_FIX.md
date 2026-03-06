# Dynamic Image URL Fix

## Problem
When uploading images from the admin panel, the backend returns relative URLs like `/uploads/filename.webp`, but these don't work on VPS because they need the full server URL.

**Current behavior:**
- Backend returns: `/uploads/ab9e06b304fb3cdf3d7814765bb2515e.webp`
- Frontend tries to load: `http://insapimarketing.com/uploads/...` (wrong domain)
- Should load from: `http://187.124.99.185:8000/uploads/...` (backend server)

## Root Cause
The backend returns relative paths, and the frontend doesn't convert them to absolute URLs using the API server's base URL.

## Solution
Create a utility function to convert relative upload URLs to absolute URLs based on the API_URL configuration.

---

## Implementation

### Step 1: Create URL Utility

Create `frontend/src/utils/urlHelper.ts`:

```typescript
/**
 * Get the base URL for the API server
 * Removes /api suffix if present
 */
export function getApiBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  
  // Remove /api suffix to get base URL
  return apiUrl.replace(/\/api\/?$/, '');
}

/**
 * Convert relative upload URL to absolute URL
 * @param url - Relative or absolute URL
 * @returns Absolute URL pointing to the API server
 */
export function getAbsoluteUploadUrl(url: string): string {
  if (!url) return '';
  
  // If already absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If relative URL starting with /uploads, convert to absolute
  if (url.startsWith('/uploads/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}${url}`;
  }
  
  // If just filename, add /uploads/ prefix
  if (!url.startsWith('/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/uploads/${url}`;
  }
  
  return url;
}

/**
 * Extract filename from upload URL
 * @param url - Full or relative URL
 * @returns Just the filename
 */
export function getUploadFilename(url: string): string {
  if (!url) return '';
  
  // Extract filename from URL
  const parts = url.split('/');
  return parts[parts.length - 1];
}
```

### Step 2: Update ElementorPageBuilder

Update the `handleImageUploadForPanel` function:

```typescript
import { getAbsoluteUploadUrl } from '../../utils/urlHelper';

const handleImageUploadForPanel = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);
  
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    
    if (data.success) {
      toast.success('✅ Image uploaded');
      // Convert relative URL to absolute URL
      return getAbsoluteUploadUrl(data.url);
    }
    throw new Error('Upload failed');
  } catch (error) {
    toast.error('❌ Upload failed');
    throw error;
  }
};
```

### Step 3: Update Image Rendering

Update the `renderComponent` function to handle image URLs:

```typescript
import { getAbsoluteUploadUrl } from '../../utils/urlHelper';

// In renderComponent function, for image type:
if (comp.type === 'image') {
  const imageSrc = getAbsoluteUploadUrl(comp.props.src || '');
  
  return (
    <img
      key={comp.id}
      src={imageSrc}
      alt={comp.props.alt || 'Image'}
      style={convertedStyles}
      className={comp.props.className}
    />
  );
}
```

### Step 4: Update LivePageRenderer

Update `frontend/src/components/LivePageRenderer.tsx`:

```typescript
import { getAbsoluteUploadUrl } from '../utils/urlHelper';

// In renderComponent function:
if (comp.type === 'image') {
  const imageSrc = getAbsoluteUploadUrl(comp.props.src || '');
  
  return (
    <img
      key={comp.id}
      src={imageSrc}
      alt={comp.props.alt || 'Image'}
      style={convertedStyles}
    />
  );
}
```

### Step 5: Update EditableImage Component

Update `frontend/src/components/EditableImage.tsx`:

```typescript
import { getAbsoluteUploadUrl } from '../utils/urlHelper';

// In the component:
const absoluteSrc = getAbsoluteUploadUrl(src);

// Use absoluteSrc instead of src:
<img
  src={absoluteSrc}
  alt={alt}
  // ... rest of props
/>
```

---

## How It Works

### Example Flow

1. **Upload Image**
   ```
   User uploads image → Backend saves to /uploads/abc123.webp
   Backend returns: { success: true, url: "/uploads/abc123.webp" }
   ```

2. **Frontend Processes URL**
   ```typescript
   // VITE_API_URL = "http://187.124.99.185:8000/api"
   const relativeUrl = "/uploads/abc123.webp";
   const absoluteUrl = getAbsoluteUploadUrl(relativeUrl);
   // Result: "http://187.124.99.185:8000/uploads/abc123.webp"
   ```

3. **Image Displays Correctly**
   ```html
   <img src="http://187.124.99.185:8000/uploads/abc123.webp" />
   ```

### Environment-Based URLs

**Development (.env):**
```env
VITE_API_URL=http://localhost:8000/api
```
Result: `http://localhost:8000/uploads/filename.webp`

**Production (.env):**
```env
VITE_API_URL=http://187.124.99.185:8000/api
```
Result: `http://187.124.99.185:8000/uploads/filename.webp`

**With Domain (.env):**
```env
VITE_API_URL=https://insapimarketing.com/api
```
Result: `https://insapimarketing.com/uploads/filename.webp`

---

## Alternative: Proxy Through Nginx

Instead of direct backend access, you can proxy uploads through Nginx:

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name insapimarketing.com;
    
    root /path/to/app/frontend/dist;
    index index.html;
    
    # Proxy API requests
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Proxy uploads through same domain
    location /uploads {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Update Frontend .env

```env
VITE_API_URL=https://insapimarketing.com/api
```

### Benefits

1. **Same Domain**: No CORS issues
2. **SSL**: Uploads work with HTTPS
3. **Caching**: Nginx can cache images
4. **Simpler**: Frontend just uses relative URLs

With this setup:
- Backend returns: `/uploads/filename.webp`
- Frontend uses: `/uploads/filename.webp` (relative)
- Browser loads from: `https://insapimarketing.com/uploads/filename.webp`
- Nginx proxies to: `http://localhost:8000/uploads/filename.webp`

---

## Quick Fix Script

Create `fix-image-urls.sh`:

```bash
#!/bin/bash

echo "Creating URL helper utility..."

# Create utils directory
mkdir -p frontend/src/utils

# Create urlHelper.ts
cat > frontend/src/utils/urlHelper.ts << 'EOF'
/**
 * Get the base URL for the API server
 * Removes /api suffix if present
 */
export function getApiBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  return apiUrl.replace(/\/api\/?$/, '');
}

/**
 * Convert relative upload URL to absolute URL
 */
export function getAbsoluteUploadUrl(url: string): string {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.startsWith('/uploads/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}${url}`;
  }
  
  if (!url.startsWith('/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/uploads/${url}`;
  }
  
  return url;
}
EOF

echo "✓ Created urlHelper.ts"
echo ""
echo "Next steps:"
echo "1. Import getAbsoluteUploadUrl in your components"
echo "2. Wrap image URLs: getAbsoluteUploadUrl(imageUrl)"
echo "3. Rebuild frontend: npm run build"
echo ""
echo "Or use Nginx proxy method (see DYNAMIC_IMAGE_URL_FIX.md)"
```

---

## Testing

### Test 1: Upload Image
1. Go to admin panel
2. Upload an image
3. Check browser Network tab
4. Response should show: `{ "success": true, "url": "/uploads/abc123.webp" }`

### Test 2: Image Display
1. After upload, image should display in editor
2. Check image src in browser DevTools
3. Should be: `http://187.124.99.185:8000/uploads/abc123.webp`

### Test 3: Published Page
1. Save and publish page
2. View published page
3. Images should load correctly
4. Check Network tab - no 404 errors

---

## Summary

**Problem**: Backend returns relative URLs, frontend doesn't know the base URL

**Solution 1**: Create utility to convert relative → absolute URLs
- Pros: Simple, works immediately
- Cons: Exposes backend URL

**Solution 2**: Proxy uploads through Nginx
- Pros: Same domain, better security, caching
- Cons: Requires Nginx configuration

**Recommendation**: Use Solution 2 (Nginx proxy) for production
