// Image cache utility for faster loading
const imageCache = new Map<string, HTMLImageElement>();

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  await Promise.all(sources.map(src => preloadImage(src)));
};

export const isImageCached = (src: string): boolean => {
  return imageCache.has(src);
};

// Critical images to preload
export const criticalImages = [
  '/src/assets/home/hero-desktop.png',
  '/src/assets/home/hero-mobile.png',
  '/src/assets/shared/logo.png',
];

// Service images to preload after initial load
export const serviceImages = [
  '/src/assets/home/services/social-media.webp',
  '/src/assets/home/services/seo.webp',
  '/src/assets/home/services/google-ads.webp',
  '/src/assets/home/services/meta-ads.webp',
  '/src/assets/home/services/website.webp',
  '/src/assets/home/services/shopify.webp',
  '/src/assets/home/services/content.webp',
  '/src/assets/home/services/branding.webp',
];

// Initialize preloading
export const initializeImagePreloading = () => {
  // Preload critical images immediately
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Preload service images after a short delay
  setTimeout(() => {
    serviceImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, 1000);
};
