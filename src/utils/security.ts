/**
 * Security utilities for input validation and sanitization
 * Addresses security vulnerabilities in URL handling and input validation
 */

// Security: Whitelist of allowed domains for external resources
export const ALLOWED_DOMAINS = {
  images: [
    'unsplash.com',
    'images.unsplash.com',
    'plus.unsplash.com',
    'localhost',
    '127.0.0.1',
    'tarcisiobispo.github.io',
    'tbisp0.github.io'
  ],
  analytics: [
    'google-analytics.com',
    'googletagmanager.com',
    'clarity.ms',
    'logrocket.com',
    'logrocket.io'
  ],
  email: [
    'api.emailjs.com',
    'emailjs.com'
  ]
};

// Security: Allowed protocols
const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Validates and sanitizes a URL string
 * @param urlString - The URL to validate
 * @param allowedDomains - Array of allowed domains
 * @returns Sanitized URL or null if invalid
 */
export const validateUrl = (
  urlString: string,
  allowedDomains: string[] = ALLOWED_DOMAINS.images
): string | null => {
  try {
    // Basic input validation
    if (!urlString || typeof urlString !== 'string') {
      return null;
    }

    // Remove potential XSS vectors and normalize
    const cleanUrl = urlString.trim().replace(/[<>'"]/g, '');

    // Validate URL structure
    const url = new URL(cleanUrl);

    // Security: Protocol validation
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
      console.warn(`Security: Blocked URL with unauthorized protocol: ${url.protocol}`);
      return null;
    }

    // Security: Domain validation
    const isAllowedDomain = allowedDomains.some(domain => {
      return url.hostname === domain || url.hostname.endsWith('.' + domain);
    });

    if (!isAllowedDomain) {
      console.warn(`Security: Blocked URL from unauthorized domain: ${url.hostname}`);
      return null;
    }

    return url.toString();
  } catch (error) {
    console.warn('Security: Invalid URL structure:', error);
    return null;
  }
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeHtml = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*javascript\s*:/gi, '');

  // Remove dangerous tags
  const dangerousTags = ['script', 'object', 'embed', 'form', 'input', 'iframe'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  return sanitized;
};

/**
 * Validates email addresses with security considerations
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Security: Prevent email header injection
  if (email.includes('\n') || email.includes('\r') || email.includes('\0')) {
    return false;
  }

  // Basic email validation regex (RFC 5322 compliant)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validates and sanitizes form input
 * @param input - Input to validate
 * @param maxLength - Maximum allowed length
 * @returns Sanitized input or null if invalid
 */
export const validateFormInput = (input: string, maxLength: number = 1000): string | null => {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Security: Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(input))) {
    console.warn('Security: Blocked input containing suspicious patterns');
    return null;
  }

  // Trim and limit length
  const sanitized = input.trim().substring(0, maxLength);

  return sanitized;
};

/**
 * Creates a Content Security Policy header value
 * @returns CSP header value
 */
export const createCSPHeader = (): string => {
  const cspDirectives = [
    "default-src 'self'",
    "img-src 'self' data: https: blob:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com",
    "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://google-analytics.com https://clarity.ms https://www.clarity.ms https://cdn.gpteng.co https://cdn.lgrckt-in.com https://static.logrocket.io https://cdn.logrocket.com https://ssl.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://www.google-analytics.com https://google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://clarity.ms https://www.clarity.ms https://api.logrocket.io https://ingest.logrocket.io https://r.logrocket.io https://cdn.logrocket.io https://cdn.logrocket.com https://region1.google-analytics.com https://region1.analytics.google.com https://api.emailjs.com https://emailjs.com",
    "worker-src 'self' blob: data: https://cdn.logrocket.com",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ];

  return cspDirectives.join('; ');
};

/**
 * Rate limiting utility for preventing abuse
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return true;
  }

  reset(identifier?: string): void {
    if (identifier) {
      this.requests.delete(identifier);
    } else {
      this.requests.clear();
    }
  }
}

// Export a default rate limiter instance
export const defaultRateLimiter = new RateLimiter();
