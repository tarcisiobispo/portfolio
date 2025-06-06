/**
 * Secure validation utilities to prevent regex-based security vulnerabilities
 * Replaces potentially vulnerable regex patterns with safer alternatives
 */

/**
 * Secure hostname validation using allowlist approach
 * Uses proper regex pattern for hostname validation
 */
export const validateHostname = (hostname: string): boolean => {
  if (typeof hostname !== 'string' || !hostname) {
    return false;
  }

  // Normalize hostname (lowercase, trim)
  const normalizedHostname = hostname.toLowerCase().trim();

  // Allowlist of permitted hostnames with proper regex pattern
  // This pattern validates the entire hostname string from start to end
  // to prevent partial matches and other bypass techniques
  const ALLOWED_HOSTNAME_PATTERNS = [
    /^tarcisiobispo\.github\.io$/,
    /^localhost$/,
    /^127\.0\.0\.1$/,
    /^::1$/,  // IPv6 localhost
    /^images\.unsplash\.com$/,
    /^unsplash\.com$/,
    /^plus\.unsplash\.com$/,
    // Analytics and tracking domains (secure validation)
    /^production\.wootric\.com$/,
    /^web\.delighted\.com$/,
    /^e\.logrocket\.com$/,
    /^api\.logrocket\.com$/,
    /^app\.logrocket\.com$/,
    /^app\.logrocket\.io$/,
    /^api\.logrocket\.io$/,
    /^e\.logrocket\.io$/
  ];

  // Test against each pattern
  return ALLOWED_HOSTNAME_PATTERNS.some(pattern => pattern.test(normalizedHostname));
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
    
    // Use forEach instead of for...of to avoid iterator compatibility issues
    urlParams.forEach((value, key) => {
      // Sanitize both key and value
      const safeKey = sanitizeString(key);
      const safeValue = sanitizeString(value);
      if (safeKey) {
        params[safeKey] = safeValue;
      }
    });
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
 * Secure validation for analytics and tracking domains
 * Uses proper regex patterns to prevent bypass attacks
 */
export const validateAnalyticsDomain = (hostname: string): boolean => {
  if (typeof hostname !== 'string' || !hostname) {
    return false;
  }

  const normalizedHostname = hostname.toLowerCase().trim();

  // Specific allowlist for analytics domains using proper regex patterns
  // Each pattern validates the entire hostname string from start to end
  const ANALYTICS_DOMAIN_PATTERNS = [
    /^production\.wootric\.com$/,
    /^web\.delighted\.com$/,
    /^e\.logrocket\.com$/,
    /^api\.logrocket\.com$/,
    /^app\.logrocket\.com$/,
    /^app\.logrocket\.io$/,
    /^api\.logrocket\.io$/,
    /^e\.logrocket\.io$/,
    /^cdn\.logrocket\.com$/,
    /^cdn\.logrocket\.io$/,
    /^cdn\.lr-ingest\.io$/,
    /^cdn\.lr-in\.com$/,
    /^cdn\.lr-in-prod\.com$/,
    /^cdn\.lr-ingest\.com$/,
    /^cdn\.ingest-lr\.com$/,
    /^cdn\.lr-intake\.com$/,
    /^cdn\.intake-lr\.com$/,
    /^cdn\.logr-ingest\.com$/,
    /^cdn\.lrkt-in\.com$/,
    /^cdn\.lgrckt-in\.com$/,
    /^cdn-staging\.logrocket\.io$/,
    /^cdn-staging\.lr-ingest\.io$/,
    /^cdn-staging\.lr-in\.com$/,
    /^cdn-staging\.lr-in-prod\.com$/,
    /^cdn-staging\.lr-ingest\.com$/,
    /^cdn-staging\.ingest-lr\.com$/,
    /^cdn-staging\.lr-intake\.com$/,
    /^cdn-staging\.intake-lr\.com$/,
    /^cdn-staging\.logr-ingest\.com$/,
    /^cdn-staging\.lrkt-in\.com$/,
    /^cdn-staging\.lgrckt-in\.com$/,
    /^r\.logrocket\.io$/,
    /^r\.lr-ingest\.io$/,
    /^r\.lr-in\.com$/,
    /^r\.lr-in-prod\.com$/,
    /^r\.lr-ingest\.com$/,
    /^r\.ingest-lr\.com$/,
    /^r\.lr-intake\.com$/,
    /^r\.intake-lr\.com$/,
    /^r\.logr-ingest\.com$/,
    /^r\.lrkt-in\.com$/,
    /^r\.lgrckt-in\.com$/,
    /^staging-i\.logrocket\.io$/,
    /^staging-i\.lr-ingest\.io$/,
    /^staging-i\.lr-in\.com$/,
    /^staging-i\.lr-in-prod\.com$/,
    /^staging-i\.lr-ingest\.com$/,
    /^staging-i\.ingest-lr\.com$/,
    /^staging-i\.lr-intake\.com$/,
    /^staging-i\.intake-lr\.com$/,
    /^staging-i\.logr-ingest\.com$/,
    /^staging-i\.lrkt-in\.com$/,
    /^staging-i\.lgrckt-in\.com$/,
    /^www\.google-analytics\.com$/,
    /^analytics\.google\.com$/,
    /^www\.clarity\.ms$/,
    /^clarity\.microsoft\.com$/,
    /^www\.googletagmanager\.com$/
  ];

  // Test against each pattern
  return ANALYTICS_DOMAIN_PATTERNS.some(pattern => pattern.test(normalizedHostname));
};

/**
 * Secure URL validation specifically for analytics endpoints
 * Uses exact string matching instead of vulnerable regex patterns
 */
export const validateAnalyticsUrl = (url: string): boolean => {
  if (typeof url !== 'string' || !url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    // Must use HTTPS for analytics
    if (parsedUrl.protocol !== 'https:') {
      return false;
    }

    // Validate against analytics domain allowlist
    return validateAnalyticsDomain(parsedUrl.hostname);
  } catch {
    return false;
  }
};

/**
 * Secure pattern matching for analytics endpoints
 * Uses proper regex patterns for secure hostname validation
 */
export const matchesAnalyticsPattern = (url: string, pattern: 'wootric' | 'delighted' | 'logrocket'): boolean => {
  if (typeof url !== 'string' || !url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase().trim();

    switch (pattern) {
      case 'wootric':
        // Exact hostname match with regex and secure path validation
        if (!/^production\.wootric\.com$/.test(hostname)) {
          return false;
        }
        
        // Validate path segments more precisely
        const wootricPathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        return wootricPathSegments.length > 0 && wootricPathSegments[0] === 'responses';

      case 'delighted':
        // Exact hostname match with regex and secure path validation
        if (!/^web\.delighted\.com$/.test(hostname)) {
          return false;
        }
        
        // Validate path segments more precisely
        const delightedPathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        return delightedPathSegments.length >= 2 && 
               delightedPathSegments.includes('e') && 
               delightedPathSegments.includes('c');

      case 'logrocket':
        // Exact hostname match using regex patterns
        const validLogRocketDomainPatterns = [
          /^e\.logrocket\.com$/,
          /^api\.logrocket\.com$/,
          /^app\.logrocket\.com$/,
          /^app\.logrocket\.io$/,
          /^api\.logrocket\.io$/,
          /^e\.logrocket\.io$/,
          /^cdn\.logrocket\.com$/,
          /^cdn\.logrocket\.io$/,
          /^cdn\.lr-ingest\.io$/,
          /^cdn\.lr-in\.com$/,
          /^cdn\.lr-in-prod\.com$/,
          /^cdn\.lr-ingest\.com$/,
          /^cdn\.ingest-lr\.com$/,
          /^cdn\.lr-intake\.com$/,
          /^cdn\.intake-lr\.com$/,
          /^cdn\.logr-ingest\.com$/,
          /^cdn\.lrkt-in\.com$/,
          /^cdn\.lgrckt-in\.com$/,
          /^cdn-staging\.logrocket\.io$/,
          /^cdn-staging\.lr-ingest\.io$/,
          /^cdn-staging\.lr-in\.com$/,
          /^cdn-staging\.lr-in-prod\.com$/,
          /^cdn-staging\.lr-ingest\.com$/,
          /^cdn-staging\.ingest-lr\.com$/,
          /^cdn-staging\.lr-intake\.com$/,
          /^cdn-staging\.intake-lr\.com$/,
          /^cdn-staging\.logr-ingest\.com$/,
          /^cdn-staging\.lrkt-in\.com$/,
          /^cdn-staging\.lgrckt-in\.com$/,
          /^r\.logrocket\.io$/,
          /^r\.lr-ingest\.io$/,
          /^r\.lr-in\.com$/,
          /^r\.lr-in-prod\.com$/,
          /^r\.lr-ingest\.com$/,
          /^r\.ingest-lr\.com$/,
          /^r\.lr-intake\.com$/,
          /^r\.intake-lr\.com$/,
          /^r\.logr-ingest\.com$/,
          /^r\.lrkt-in\.com$/,
          /^r\.lgrckt-in\.com$/,
          /^staging-i\.logrocket\.io$/,
          /^staging-i\.lr-ingest\.io$/,
          /^staging-i\.lr-in\.com$/,
          /^staging-i\.lr-in-prod\.com$/,
          /^staging-i\.lr-ingest\.com$/,
          /^staging-i\.ingest-lr\.com$/,
          /^staging-i\.lr-intake\.com$/,
          /^staging-i\.intake-lr\.com$/,
          /^staging-i\.logr-ingest\.com$/,
          /^staging-i\.lrkt-in\.com$/,
          /^staging-i\.lgrckt-in\.com$/
        ];
        return validLogRocketDomainPatterns.some(pattern => pattern.test(hostname));

      default:
        return false;
    }
  } catch {
    return false;
  }
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
  validateFileExtension,
  validateAnalyticsDomain,
  validateAnalyticsUrl,
  matchesAnalyticsPattern
};

export default SecureValidation;
