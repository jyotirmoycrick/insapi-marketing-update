/**
 * Image Preloading Utilities
 * Optimizes image loading performance
 */

/**
 * Preload a single image
 * @param src - Image URL to preload
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!src) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      resolve(); // Resolve anyway to not block
    };
    img.src = src;
  });
}

/**
 * Preload multiple images in parallel
 * @param srcs - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  const validSrcs = srcs.filter(src => src && src.trim() !== '');
  await Promise.all(validSrcs.map(preloadImage));
}

/**
 * Preload images in background using requestIdleCallback
 * Non-blocking, won't affect page performance
 * @param srcs - Array of image URLs to preload
 */
export function preloadImagesInBackground(srcs: string[]): void {
  const validSrcs = srcs.filter(src => src && src.trim() !== '');
  
  if (validSrcs.length === 0) return;

  const preload = () => {
    validSrcs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload, { timeout: 2000 });
  } else {
    setTimeout(preload, 1);
  }
}

/**
 * Check if image is already cached
 * @param src - Image URL to check
 * @returns true if image is cached
 */
export function isImageCached(src: string): boolean {
  if (!src) return false;

  const img = new Image();
  img.src = src;
  return img.complete && img.naturalHeight !== 0;
}

/**
 * Get optimal image loading strategy based on position
 * @param isAboveFold - Whether image is above the fold
 * @param isPriority - Whether image is high priority
 * @returns Loading strategy
 */
export function getLoadingStrategy(isAboveFold: boolean, isPriority: boolean = false) {
  return {
    loading: (isAboveFold || isPriority) ? 'eager' as const : 'lazy' as const,
    fetchPriority: isPriority ? 'high' as const : 'auto' as const,
    decoding: 'async' as const,
  };
}
