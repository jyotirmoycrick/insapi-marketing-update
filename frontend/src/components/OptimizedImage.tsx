import { useState, useEffect, useRef } from 'react';
import { getAbsoluteUploadUrl } from '../utils/urlHelper';
import { preloadImage, isImageCached } from '../utils/imagePreloader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  aspectRatio?: string;
}

/**
 * Optimized Image Component
 * Features:
 * - Lazy loading with Intersection Observer
 * - Blur-up placeholder effect
 * - Automatic preloading for priority images
 * - Responsive images with sizes attribute
 * - Cache-aware loading
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  style = {},
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  aspectRatio
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);
  const absoluteSrc = getAbsoluteUploadUrl(src);

  // Check if image is already cached
  useEffect(() => {
    if (absoluteSrc && isImageCached(absoluteSrc)) {
      setIsLoaded(true);
      setShouldLoad(true);
    }
  }, [absoluteSrc]);

  // Preload priority images
  useEffect(() => {
    if (priority && absoluteSrc) {
      preloadImage(absoluteSrc).then(() => {
        setIsLoaded(true);
      });
    }
  }, [priority, absoluteSrc]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before image enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${absoluteSrc}`);
    setIsLoaded(true); // Remove placeholder even on error
  };

  const containerStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio && { aspectRatio }),
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden bg-gray-100 ${className}`} 
      style={containerStyle}
    >
      {/* Loading placeholder with shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
      )}

      {/* Actual image */}
      {shouldLoad && (
        <img
          src={absoluteSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            verticalAlign: 'bottom',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}
