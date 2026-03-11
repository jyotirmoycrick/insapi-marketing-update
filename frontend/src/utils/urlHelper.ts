/**
 * URL Helper Utilities
 * Handles conversion of relative upload URLs to absolute URLs
 */

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
 * 
 * Examples:
 * - "/uploads/abc.jpg" → "http://server:8000/uploads/abc.jpg"
 * - "http://example.com/image.jpg" → "http://example.com/image.jpg" (unchanged)
 * - "abc.jpg" → "http://server:8000/uploads/abc.jpg"
 */
export function getAbsoluteUploadUrl(url: string): string {
  if (!url) return '';
  
  // If already absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Preserve already-versioned API upload paths
  if (url.startsWith('/api/uploads/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}${url}`;
  }
  
  // If relative URL starting with /uploads, convert to absolute
  if (url.startsWith('/uploads/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/api/uploads/${getUploadFilename(url)}`;
  }
  
  // If just filename, route through cache-enabled API upload endpoint
  if (!url.startsWith('/')) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/api/uploads/${url}`;
  }
  
  // Other relative URLs
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${url}`;
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

/**
 * Check if URL is an upload URL
 * @param url - URL to check
 * @returns true if URL points to uploads directory
 */
export function isUploadUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('/uploads/') || url.includes('/api/uploads/');
}
