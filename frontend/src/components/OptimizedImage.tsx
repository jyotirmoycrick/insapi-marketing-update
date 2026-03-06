import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { getAbsoluteUploadUrl } from '../utils/urlHelper';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean; // Is this image above the fold / LCP candidate?
  responsive?: boolean; // Generate responsive srcset?
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Centralized Optimized Image Component
 * 
 * Automatically handles:
 * - Correct loading strategy (eager vs lazy)
 * - Responsive image sizes
 * - Dimension enforcement
 * - Network priority for critical images
 * - Performance-safe defaults
 * 
 * Usage:
 * <OptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero"
 *   width={1920}
 *   height={800}
 *   priority={true}  // For LCP images
 * />
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  responsive = true,
  sizes,
  className = '',
  style = {},
  onLoad,
  onError,
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Convert relative URLs to absolute
  const absoluteSrc = getAbsoluteUploadUrl(src);
  
  useEffect(() => {
    if (priority) return; // Already marked as priority
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading slightly before entering viewport
      }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority]);
  
  // Generate responsive srcset for different screen sizes
  const generateSrcSet = () => {
    if (!responsive) return undefined;
    
    // For now, return the same image
    // In production, you'd generate multiple sizes
    return `${absoluteSrc} ${width}w`;
  };
  
  // Calculate default sizes if not provided
  const defaultSizes = sizes || (
    priority 
      ? '100vw' // LCP images typically full width
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  );
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleError = () => {
    onError?.();
  };
  
  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : 'lazy';
  const fetchPriorityValue = priority ? 'high' : 'auto';
  
  return (
    <img
      ref={imgRef}
      src={absoluteSrc}
      srcSet={generateSrcSet()}
      sizes={defaultSizes}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding="async"
      fetchPriority={fetchPriorityValue}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{
        ...style,
        aspectRatio: `${width} / ${height}`, // Modern CSS for aspect ratio
      }}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
}

/**
 * Responsive Picture Component
 * For art direction and format switching
 */
interface ResponsivePictureProps {
  mobileSrc: string;
  desktopSrc: string;
  alt: string;
  mobileWidth: number;
  mobileHeight: number;
  desktopWidth: number;
  desktopHeight: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ResponsivePicture({
  mobileSrc,
  desktopSrc,
  alt,
  mobileWidth,
  mobileHeight,
  desktopWidth,
  desktopHeight,
  priority = false,
  className = '',
  style = {},
}: ResponsivePictureProps) {
  const absoluteMobileSrc = getAbsoluteUploadUrl(mobileSrc);
  const absoluteDesktopSrc = getAbsoluteUploadUrl(desktopSrc);
  
  return (
    <picture className={className} style={style}>
      <source
        media="(max-width: 767px)"
        srcSet={absoluteMobileSrc}
        width={mobileWidth}
        height={mobileHeight}
      />
      <img
        src={absoluteDesktopSrc}
        alt={alt}
        width={desktopWidth}
        height={desktopHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </picture>
  );
}
