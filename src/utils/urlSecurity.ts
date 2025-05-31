import { 
  ALLOWED_IMAGE_HOSTNAMES, 
  ALLOWED_SCHEMES, 
  MAX_URL_LENGTH, 
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_URL_PARAMS 
} from '@/config/security';

/**
 * Validates if a hostname is in the allowed list
 */
export const isAllowedHostname = (hostname: string): boolean => {
  const normalizedHostname = hostname.toLowerCase();
  return ALLOWED_IMAGE_HOSTNAMES.some(allowed => 
    normalizedHostname === allowed || normalizedHostname.endsWith(`.${allowed}`)
  );
};

/**
 * Validates if a URL scheme is allowed
 */
export const isAllowedScheme = (scheme: string): boolean => {
  return ALLOWED_SCHEMES.includes(scheme as any);
};

/**
 * Validates if a file extension is allowed for images
 */
export const isAllowedImageExtension = (url: string): boolean => {
  const pathname = new URL(url).pathname.toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.some(ext => pathname.endsWith(ext));
};

/**
 * Comprehensive URL validation for security
 */
export const isValidImageUrl = (urlString: string): boolean => {
  try {
    // Check URL length
    if (urlString.length > MAX_URL_LENGTH) {
      console.warn('URL exceeds maximum length:', urlString.length);
      return false;
    }

    // Parse URL
    const url = new URL(urlString);

    // Validate scheme
    if (!isAllowedScheme(url.protocol)) {
      console.warn('Invalid URL scheme:', url.protocol);
      return false;
    }

    // Validate hostname
    if (!isAllowedHostname(url.hostname)) {
      console.warn('Hostname not in allowlist:', url.hostname);
      return false;
    }

    // Validate file extension (optional, some CDNs don't use extensions)
    if (url.pathname.includes('.') && !isAllowedImageExtension(urlString)) {
      console.warn('Invalid image extension:', url.pathname);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Invalid URL format:', error);
    return false;
  }
};

/**
 * Sanitizes URL parameters by removing non-whitelisted ones
 */
export const sanitizeUrlParams = (url: URL): URL => {
  const sanitizedUrl = new URL(url.toString());
  const paramsToDelete: string[] = [];

  // Collect non-whitelisted parameters
  sanitizedUrl.searchParams.forEach((value, key) => {
    if (!ALLOWED_URL_PARAMS.includes(key as any)) {
      paramsToDelete.push(key);
    }
  });

  // Remove non-whitelisted parameters
  paramsToDelete.forEach(param => {
    sanitizedUrl.searchParams.delete(param);
  });

  return sanitizedUrl;
};

/**
 * Safely creates an optimized image URL for Unsplash
 */
export const createOptimizedUnsplashUrl = (
  originalUrl: string, 
  options: {
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    width?: number;
    height?: number;
  } = {}
): string | null => {
  try {
    // Validate the original URL first
    if (!isValidImageUrl(originalUrl)) {
      return null;
    }

    const url = new URL(originalUrl);
    
    // Double-check it's actually an Unsplash URL
    if (!url.hostname.includes('unsplash.com')) {
      console.warn('URL is not from Unsplash:', url.hostname);
      return null;
    }

    // Sanitize existing parameters
    const sanitizedUrl = sanitizeUrlParams(url);

    // Add optimization parameters safely
    if (options.format) {
      sanitizedUrl.searchParams.set('fm', options.format);
    }
    
    if (options.quality && options.quality >= 1 && options.quality <= 100) {
      sanitizedUrl.searchParams.set('q', options.quality.toString());
    }
    
    if (options.width && options.width > 0 && options.width <= 4000) {
      sanitizedUrl.searchParams.set('w', options.width.toString());
    }
    
    if (options.height && options.height > 0 && options.height <= 4000) {
      sanitizedUrl.searchParams.set('h', options.height.toString());
    }

    return sanitizedUrl.toString();
  } catch (error) {
    console.error('Error creating optimized URL:', error);
    return null;
  }
};

/**
 * Generic secure URL parameter setter
 */
export const setSecureUrlParam = (
  urlString: string, 
  paramName: string, 
  paramValue: string
): string | null => {
  try {
    if (!isValidImageUrl(urlString)) {
      return null;
    }

    if (!ALLOWED_URL_PARAMS.includes(paramName as any)) {
      console.warn('Parameter not in allowlist:', paramName);
      return null;
    }

    const url = new URL(urlString);
    url.searchParams.set(paramName, paramValue);
    
    return url.toString();
  } catch (error) {
    console.error('Error setting URL parameter:', error);
    return null;
  }
};

/**
 * Validates and sanitizes any external image URL
 */
export const sanitizeImageUrl = (urlString: string): string | null => {
  try {
    if (!isValidImageUrl(urlString)) {
      return null;
    }

    const url = new URL(urlString);
    const sanitizedUrl = sanitizeUrlParams(url);
    
    return sanitizedUrl.toString();
  } catch (error) {
    console.error('Error sanitizing URL:', error);
    return null;
  }
};