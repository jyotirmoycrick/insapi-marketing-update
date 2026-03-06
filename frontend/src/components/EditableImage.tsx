import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { getAbsoluteUploadUrl } from '../utils/urlHelper';
import { preloadImage, isImageCached } from '../utils/imagePreloader';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  imageKey: string;
  page: string;
  section: string;
  onImageChange?: (newUrl: string) => void;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
}

export function EditableImage({
  src,
  alt,
  className = '',
  style = {},
  imageKey,
  page,
  section,
  onImageChange,
  loading = 'lazy',
  priority = false,
  width,
  height,
  fetchPriority,
  decoding = 'async',
  sizes
}: EditableImageProps) {
  const { isEditMode } = useAdmin();
  const [currentSrc, setCurrentSrc] = useState(getAbsoluteUploadUrl(src));
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check for both admin_token (FastAdmin) and authToken (regular admin)
  const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken');

  // Sync with parent's src prop changes
  useEffect(() => {
    const newSrc = getAbsoluteUploadUrl(src);
    setCurrentSrc(newSrc);
    
    // Check if already cached
    if (newSrc && isImageCached(newSrc)) {
      setImageLoaded(true);
    }
  }, [src]);

  // Preload priority images
  useEffect(() => {
    if (priority && currentSrc) {
      preloadImage(currentSrc).then(() => {
        setImageLoaded(true);
      });
    }
  }, [priority, currentSrc]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check for token with helpful message
    if (!token) {
      toast.error('❌ Please login through /fast-admin to edit images');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('❌ Image too large! Maximum size is 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('❌ Please upload an image file');
      return;
    }

    setIsUploading(true);
    toast.loading('Uploading image...', { id: 'upload' });

    try {
      // Upload image
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', token);

      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      // Check for 401 Unauthorized
      if (uploadRes.status === 401) {
        toast.error('❌ Session expired. Please login again at /fast-admin', { id: 'upload' });
        return;
      }
      
      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error('Upload failed');
      }

      const newImageUrl = uploadData.url;

      // Save image URL to content database
      const contentRes = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          section,
          key: imageKey,
          value: newImageUrl,
          type: 'image',
          token
        })
      });

      const contentData = await contentRes.json();
      
      if (!contentRes.ok || !contentData.success) {
        console.error('Content save failed:', contentData);
        throw new Error(contentData.message || 'Failed to save image reference');
      }

      console.log('✅ Image saved to database:', { page, section, key: imageKey, value: newImageUrl });

      // Update UI
      setCurrentSrc(getAbsoluteUploadUrl(newImageUrl));
      if (onImageChange) {
        onImageChange(newImageUrl);
      }

      toast.success('✅ Image saved successfully! Changes are live.', { id: 'upload' });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`❌ Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: 'upload' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (!confirm('Remove this image? The page will show a placeholder until you upload a new image.')) return;

    toast.loading('Removing image...', { id: 'remove' });

    try {
      const contentRes = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          section,
          key: imageKey,
          value: '',
          type: 'image',
          token
        })
      });

      if (!contentRes.ok) {
        throw new Error('Failed to remove image');
      }

      setCurrentSrc('');
      if (onImageChange) {
        onImageChange('');
      }

      toast.success('✅ Image removed successfully! Changes are live.', { id: 'remove' });
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('❌ Failed to remove image', { id: 'remove' });
    }
  };

  if (!currentSrc) {
    if (isEditMode) {
      return (
        <div
          className={`relative bg-gray-200 flex items-center justify-center ${className}`}
          style={{ minHeight: '200px', ...style }}
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Upload size={48} />
            <span className="text-sm font-medium">Click to upload image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className={`relative group ${className}`}
      style={style}
      onMouseEnter={() => isEditMode && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Optimized image with all performance attributes preserved */}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        fetchPriority={fetchPriority || (priority ? 'high' : 'auto')}
        sizes={sizes}
        className={`w-full h-auto block transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ verticalAlign: 'bottom', ...style }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Loading skeleton with shimmer effect */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
      )}

      {/* Edit controls - only render in edit mode */}
      {isEditMode && isHovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow-lg disabled:opacity-50 transition-colors"
          >
            <Upload size={18} />
            {isUploading ? 'Uploading...' : 'Change Image'}
          </button>
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 shadow-lg transition-colors"
          >
            <X size={18} />
            Remove
          </button>
        </div>
      )}

      {isEditMode && !isHovered && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          🖼️ Hover to edit
        </div>
      )}

      {isEditMode && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleUpload}
        />
      )}
    </div>
  );
}
