/**
 * Security configuration for URL validation and sanitization
 */

// Allowed hostnames for external image sources
export const ALLOWED_IMAGE_HOSTNAMES = [
  'unsplash.com',
  'images.unsplash.com',
  'plus.unsplash.com',
  // Add other trusted image CDNs as needed
  'cdn.example.com',
  'assets.example.com'
] as const;

// Allowed URL schemes
export const ALLOWED_SCHEMES = ['https:', 'http:'] as const;

// Maximum URL length to prevent DoS attacks
export const MAX_URL_LENGTH = 2048;

// Allowed image file extensions
export const ALLOWED_IMAGE_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.bmp', '.tiff'
] as const;

// URL parameter whitelist for image optimization
export const ALLOWED_URL_PARAMS = [
  'fm', 'q', 'w', 'h', 'fit', 'crop', 'auto', 'dpr', 'cs'
] as const;