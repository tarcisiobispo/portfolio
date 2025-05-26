/**
 * Utility functions for handling asset paths in development and production
 */

/**
 * Get the correct asset path for the current environment
 * In development: /images/filename
 * In production (GitHub Pages): /portfolio/images/filename
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), add the base path
  if (import.meta.env.PROD) {
    return `/portfolio/${cleanPath}`;
  }
  
  // In development, use root path
  return `/${cleanPath}`;
};

/**
 * Get image path specifically
 */
export const getImagePath = (filename: string): string => {
  return getAssetPath(`images/${filename}`);
};

/**
 * Get profile image paths with WebP support
 */
export const getProfileImagePaths = () => {
  return {
    webp: getImagePath('tarcisio_bispo.webp'),
    png: getImagePath('tarcisio_bispo.png')
  };
};

/**
 * Get IxDF logo paths
 */
export const getIxDFLogoPaths = () => {
  return {
    dark: getImagePath('IxDF - Symbol - Dark.png'),
    white: getImagePath('IxDF - Symbol - White.png')
  };
};
