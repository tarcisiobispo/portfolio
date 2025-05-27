/**
 * Secure validation utilities to prevent regex-based security vulnerabilities
 * Replaces potentially vulnerable regex patterns with safer alternatives
 */

/**
 * Secure hostname validation using allowlist approach
 * Prevents regex bypass attacks by using exact string matching
 */
export const validateHostname = (hostname: string): boolean => {
  if (typeof hostname !== 'string' || !hostname) {
    return false;
  }

  // Allowlist of permitted hostnames - exact match only
  const ALLOWED_HOSTNAMES = [
    'tarcisiobispo.github.io',
    'localhost',
    '127.0.0.1',
    '::1', // IPv6 localhost
    'images.unsplash.com',
    'unsplash.com',
    'plus.unsplash.com'
  ];

  // Normalize hostname (lowercase, trim)
  const normalizedHostname = hostname.toLowerCase().trim();

  // Exact match validation - no regex needed
  return ALLOWED_HOSTNAMES.includes(normalizedHostname);
};

/**
 * Secure URL validation without vulnerable regex patterns
 * Uses native URL constructor for robust parsing
 */
export const validateUrl = (url: string): boolean => {
  if (typeof url !== 'string' || !url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    
    // Validate protocol
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return false;
    }

    // Validate hostname using secure function
    return validateHostname(parsedUrl.hostname);
  } catch {
    return false;
  }
};

/**
 * Secure email validation using native HTML5 validation
 * Avoids complex regex patterns that can be vulnerable
 */
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string' || !email) {
    return false;
  }

  // Basic format check
  if (!email.includes('@') || email.length < 5) {
    return false;
  }

  try {
    // Use native HTML5 validation which is more secure
    const input = document.createElement('input');
    input.type = 'email';
    input.value = email;
    return input.validity.valid && input.value === email;
  } catch {
    return false;
  }
};

/**
 * Secure string sanitization without regex
 * Uses safe string methods to prevent injection
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  // Use safe string methods instead of regex
  return input
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split('"').join('&quot;')
    .split("'").join('&#x27;')
    .split('&').join('&amp;')
    .trim();
};

/**
 * Secure path validation for routing
 * Prevents path traversal without complex regex
 */
export const validatePath = (path: string): boolean => {
  if (typeof path !== 'string' || !path) {
    return false;
  }

  // Check for dangerous patterns using simple string methods
  const dangerousPatterns = ['../', '..\\', '<script', 'javascript:', 'data:', 'vbscript:'];
  const lowerPath = path.toLowerCase();

  for (const pattern of dangerousPatterns) {
    if (lowerPath.includes(pattern)) {
      return false;
    }
  }

  return true;
};

/**
 * Secure domain extraction from URL
 * Uses native URL parsing instead of regex
 */
export const extractDomain = (url: string): string | null => {
  if (typeof url !== 'string' || !url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch {
    return null;
  }
};

/**
 * Secure query parameter parsing
 * Avoids regex-based parsing vulnerabilities
 */
export const parseQueryParams = (search: string): Record<string, string> => {
  if (typeof search !== 'string' || !search) {
    return {};
  }

  const params: Record<string, string> = {};
  
  try {
    const urlParams = new URLSearchParams(search);
    for (const [key, value] of urlParams.entries()) {
      // Sanitize both key and value
      const safeKey = sanitizeString(key);
      const safeValue = sanitizeString(value);
      if (safeKey) {
        params[safeKey] = safeValue;
      }
    }
  } catch {
    // Return empty object on error
  }

  return params;
};

/**
 * Secure content type validation
 * Uses allowlist approach instead of regex
 */
export const validateContentType = (contentType: string): boolean => {
  if (typeof contentType !== 'string' || !contentType) {
    return false;
  }

  const ALLOWED_CONTENT_TYPES = [
    'text/html',
    'text/plain',
    'application/json',
    'application/javascript',
    'text/css',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  const normalizedType = contentType.toLowerCase().split(';')[0].trim();
  return ALLOWED_CONTENT_TYPES.includes(normalizedType);
};

/**
 * Secure file extension validation
 * Uses allowlist instead of regex patterns
 */
export const validateFileExtension = (filename: string): boolean => {
  if (typeof filename !== 'string' || !filename) {
    return false;
  }

  const ALLOWED_EXTENSIONS = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
    '.pdf', '.txt', '.json', '.css', '.js', '.html'
  ];

  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return false;
  }

  const extension = filename.slice(lastDotIndex).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(extension);
};

/**
 * Export all validation functions as a namespace
 */
export const SecureValidation = {
  validateHostname,
  validateUrl,
  validateEmail,
  sanitizeString,
  validatePath,
  extractDomain,
  parseQueryParams,
  validateContentType,
  validateFileExtension
};

export default SecureValidation;
