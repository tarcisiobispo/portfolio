/**
 * Secure LogRocket wrapper to prevent regex-based security vulnerabilities
 * Replaces vulnerable hostname validation with secure alternatives
 */

import { SecureValidation } from './secureValidation';

// Type definitions for LogRocket
interface LogRocketConfig {
  shouldAugmentNPS?: boolean;
  shouldParseXHRBlob?: boolean;
  network?: {
    isEnabled?: boolean;
    requestSanitizer?: (request: any) => any | null;
    responseSanitizer?: (response: any) => any | null;
  };
}

interface LogRocketInstance {
  init: (appId: string, config?: LogRocketConfig) => void;
  identify: (userId: string, userInfo?: Record<string, any>) => void;
  track: (eventName: string, properties?: Record<string, any>) => void;
  getSessionURL: (callback: (url: string) => void) => void;
  captureMessage: (message: string, extra?: Record<string, any>) => void;
  captureException: (error: Error, extra?: Record<string, any>) => void;
  [key: string]: any;
}

/**
 * Secure URL interceptor for analytics requests
 * Prevents vulnerable regex patterns from being exploited
 */
class SecureAnalyticsInterceptor {
  private originalXMLHttpRequest: typeof XMLHttpRequest;
  private originalFetch: typeof fetch;

  constructor() {
    this.originalXMLHttpRequest = window.XMLHttpRequest;
    this.originalFetch = window.fetch;
  }

  /**
   * Install secure interceptors
   */
  install(): void {
    this.interceptXMLHttpRequest();
    this.interceptFetch();
  }

  /**
   * Uninstall interceptors and restore original functions
   */
  uninstall(): void {
    if (this.originalXMLHttpRequest) {
      window.XMLHttpRequest = this.originalXMLHttpRequest;
    }
    if (this.originalFetch) {
      window.fetch = this.originalFetch;
    }
  }

  /**
   * Secure XMLHttpRequest interceptor
   */
  private interceptXMLHttpRequest(): void {
    const originalXHR = this.originalXMLHttpRequest;
    const secureValidation = SecureValidation;

    // Create a constructor function that matches XMLHttpRequest's signature
    const SecureXMLHttpRequest = function(this: XMLHttpRequest) {
      const xhr = new originalXHR();
      const originalOpen = xhr.open;

      xhr.open = function(method: string, url: string, ...rest: any[]) {
        // Validate URL using secure methods instead of regex
        if (typeof url === 'string') {
          try {
            // Check if it's an analytics URL that needs special handling
            if (secureValidation.matchesAnalyticsPattern(url, 'wootric')) {
              // Secure handling for Wootric URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe Wootric URL:', url);
                return;
              }
            } else if (secureValidation.matchesAnalyticsPattern(url, 'delighted')) {
              // Secure handling for Delighted URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe Delighted URL:', url);
                return;
              }
            } else if (secureValidation.matchesAnalyticsPattern(url, 'logrocket')) {
              // Secure handling for LogRocket URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe LogRocket URL:', url);
                return;
              }
            }
          } catch (error) {
            console.warn('SecureLogRocket: Error validating URL:', error);
            return;
          }
        }

        return originalOpen.call(this, method, url, ...rest);
      };

      return xhr;
    } as unknown as typeof XMLHttpRequest;

    // Copy prototype and static properties to maintain compatibility
    SecureXMLHttpRequest.prototype = originalXHR.prototype;
    
    // Copy all static properties from the original constructor
    for (const prop of Object.getOwnPropertyNames(originalXHR)) {
      if (prop !== 'prototype' && prop !== 'length' && prop !== 'name') {
        const descriptor = Object.getOwnPropertyDescriptor(originalXHR, prop);
        if (descriptor) {
          Object.defineProperty(SecureXMLHttpRequest, prop, descriptor);
        }
      }
    }

    // Replace the global XMLHttpRequest
    window.XMLHttpRequest = SecureXMLHttpRequest;
  }

  /**
   * Secure fetch interceptor
   */
  private interceptFetch(): void {
    const originalFetch = this.originalFetch;
    const secureValidation = SecureValidation;

    // Create a secure fetch function with the same signature
    const secureFetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      let url: string;

      try {
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.href;
        } else if (input instanceof Request) {
          url = input.url;
        } else {
          url = String(input);
        }

        // Validate analytics URLs securely
        if (secureValidation.matchesAnalyticsPattern(url, 'wootric') ||
            secureValidation.matchesAnalyticsPattern(url, 'delighted') ||
            secureValidation.matchesAnalyticsPattern(url, 'logrocket')) {

          if (!secureValidation.validateAnalyticsUrl(url)) {
            console.warn('SecureLogRocket: Blocked potentially unsafe analytics URL:', url);
            return Promise.reject(new Error('URL validation failed'));
          }
        }
      } catch (error) {
        console.warn('SecureLogRocket: Error validating fetch URL:', error);
      }

      return originalFetch.call(window, input, init);
    };

    // Replace the global fetch function
    window.fetch = secureFetch;
  }
}

/**
 * Secure LogRocket wrapper class
 */
class SecureLogRocket {
  private logRocket: LogRocketInstance | null = null;
  private interceptor: SecureAnalyticsInterceptor;
  private isInitialized = false;

  constructor() {
    this.interceptor = new SecureAnalyticsInterceptor();
  }

  /**
   * Initialize LogRocket with secure interceptors
   */
  async init(appId: string, config: LogRocketConfig = {}): Promise<void> {
    if (this.isInitialized) {
      console.warn('SecureLogRocket: Already initialized');
      return;
    }

    if (!appId) {
      const error = new Error('SecureLogRocket: appId is required');
      console.error(error);
      throw error;
    }

    try {
      // Install security interceptors before LogRocket initialization
      this.interceptor.install();

      // Prevent deprecated unload event listeners
      this.preventDeprecatedEventListeners();

      let LogRocketModule;
      try {
        // Dynamically import LogRocket
        LogRocketModule = await import('logrocket');
        
        if (!LogRocketModule) {
          throw new Error('Failed to import LogRocket module');
        }

        // Handle different module formats (CJS/ESM)
        if (typeof LogRocketModule === 'object') {
          // If it's an ESM module with default export
          if ('default' in LogRocketModule) {
            this.logRocket = LogRocketModule.default as unknown as LogRocketInstance;
          } else {
            // If it's a CJS module
            this.logRocket = LogRocketModule as unknown as LogRocketInstance;
          }
        }

        if (!this.logRocket || typeof this.logRocket.init !== 'function') {
          throw new Error('LogRocket module is not properly exported');
        }
      } catch (importError) {
        console.error('SecureLogRocket: Error importing LogRocket:', importError);
        // Don't throw here, we'll handle it below
      }

      if (!this.logRocket) {
        // If we couldn't load LogRocket, create a mock implementation
        console.warn('SecureLogRocket: LogRocket not available, using mock implementation');
        this.logRocket = this.createMockImplementation();
      }

      try {
        // Initialize with secure configuration
        const secureConfig: LogRocketConfig = {
          shouldAugmentNPS: false, // Disable NPS augmentation to prevent regex issues
          shouldParseXHRBlob: false, // Disable blob parsing for security
          network: {
            isEnabled: true,
            ...(config.network || {})
          },
          ...config
        };

        // Call the init method safely
        if (typeof this.logRocket.init === 'function') {
          this.logRocket.init(appId, secureConfig);
          this.isInitialized = true;
          console.log('SecureLogRocket: Initialized successfully with security enhancements');
        } else {
          console.warn('SecureLogRocket: init method not available');
        }
      } catch (initError) {
        console.error('SecureLogRocket: Error during initialization:', initError);
        // Continue with mock implementation
        this.logRocket = this.createMockImplementation();
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('SecureLogRocket: Failed to initialize:', error);
      this.interceptor.uninstall();
      // Continue with mock implementation
      this.logRocket = this.createMockImplementation();
      this.isInitialized = true;
    }
  }

  /**
   * Create a mock implementation of LogRocket for when the real one fails to load
   */
  private createMockImplementation(): LogRocketInstance {
    console.warn('SecureLogRocket: Using mock implementation');
    
    const noop = () => {};
    const mockImplementation: LogRocketInstance = {
      init: noop,
      identify: (userId: string, userInfo?: Record<string, any>) => {
        console.log(`[Mock] identify: ${userId}`, userInfo);
      },
      track: (eventName: string, properties?: Record<string, any>) => {
        console.log(`[Mock] track: ${eventName}`, properties);
      },
      getSessionURL: (callback: (url: string) => void) => {
        console.log('[Mock] getSessionURL');
        callback('#');
      },
      captureMessage: (message: string, extra?: Record<string, any>) => {
        console.log(`[Mock] captureMessage: ${message}`, extra);
      },
      captureException: (error: Error, extra?: Record<string, any>) => {
        console.error('[Mock] captureException:', error, extra);
      }
    };
    
    return mockImplementation;
  }

  /**
   * Safely identify user
   */
  identify(userId: string, userInfo?: Record<string, any>): void {
    if (!this.logRocket) {
      // If not initialized, create a mock implementation
      this.logRocket = this.createMockImplementation();
      this.isInitialized = true;
    }

    try {
      // Sanitize user info to prevent injection
      const sanitizedUserInfo = userInfo ? this.sanitizeUserInfo(userInfo) : undefined;
      
      if (typeof this.logRocket.identify === 'function') {
        this.logRocket.identify(userId, sanitizedUserInfo);
      } else {
        console.warn('SecureLogRocket: identify method not available');
      }
    } catch (error) {
      console.error('SecureLogRocket: Error identifying user:', error);
    }
  }

  /**
   * Safely track events
   */
  track(eventName: string, properties?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      // Sanitize event properties
      const sanitizedProperties = properties ? this.sanitizeUserInfo(properties) : undefined;
      this.logRocket.track(eventName, sanitizedProperties);
    } catch (error) {
      console.error('SecureLogRocket: Error tracking event:', error);
    }
  }

  /**
   * Get session URL safely
   */
  getSessionURL(callback: (url: string) => void): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      callback('');
      return;
    }

    try {
      this.logRocket.getSessionURL((url: string) => {
        // More lenient validation for LogRocket session URLs
        if (url && typeof url === 'string' && url.length > 0) {
          try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase().trim();
            
            // Allow LogRocket domains using proper regex patterns
            const validLogRocketDomainPatterns = [
              /^app\.logrocket\.com$/,
              /^api\.logrocket\.com$/,
              /^e\.logrocket\.com$/,
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
            
            if (validLogRocketDomainPatterns.some(pattern => pattern.test(hostname))) {
              callback(url);
            } else {
              console.warn('SecureLogRocket: Invalid session URL domain:', parsedUrl.hostname);
              callback('');
            }
          } catch (urlError) {
            console.warn('SecureLogRocket: Invalid session URL format:', url);
            callback('');
          }
        } else {
          console.warn('SecureLogRocket: Empty or invalid session URL received');
          callback('');
        }
      });
    } catch (error) {
      console.error('SecureLogRocket: Error getting session URL:', error);
      callback('');
    }
  }

  /**
   * Safely capture messages
   */
  captureMessage(message: string, extra?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      const sanitizedMessage = SecureValidation.sanitizeString(message);
      const sanitizedExtra = extra ? this.sanitizeUserInfo(extra) : undefined;
      this.logRocket.captureMessage(sanitizedMessage, sanitizedExtra);
    } catch (error) {
      console.error('SecureLogRocket: Error capturing message:', error);
    }
  }

  /**
   * Safely capture exceptions
   */
  captureException(error: Error, extra?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      const sanitizedExtra = extra ? this.sanitizeUserInfo(extra) : undefined;
      this.logRocket.captureException(error, sanitizedExtra);
    } catch (captureError) {
      console.error('SecureLogRocket: Error capturing exception:', captureError);
    }
  }

  /**
   * Prevent deprecated unload event listeners
   */
  private preventDeprecatedEventListeners(): void {
    // Only apply in production to avoid interfering with development
    // Check if we're in production using a more compatible approach
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Override deprecated event listener methods to use modern alternatives
    const originalAddEventListener = window.addEventListener;

    // Create a properly typed replacement function
    const secureAddEventListener: typeof window.addEventListener = function(
      this: Window,
      type: string, 
      listener: EventListenerOrEventListenerObject, 
      options?: boolean | AddEventListenerOptions
    ) {
      // Replace deprecated unload events with modern alternatives
      if (type === 'unload') {
        console.warn('SecureLogRocket: Replacing deprecated "unload" event with "pagehide"');
        return originalAddEventListener.call(this, 'pagehide', listener, options);
      } else if (type === 'beforeunload') {
        // Keep beforeunload but add warning
        console.warn('SecureLogRocket: "beforeunload" event should be used sparingly');
        return originalAddEventListener.call(this, type, listener, options);
      }

      return originalAddEventListener.call(this, type, listener, options);
    };

    // Replace the global addEventListener method
    window.addEventListener = secureAddEventListener;
  }

  /**
   * Uninstall and cleanup
   */
  uninstall(): void {
    try {
      if (this.logRocket && typeof this.logRocket.uninstall === 'function') {
        this.logRocket.uninstall();
      }
      this.interceptor.uninstall();
      this.logRocket = null;
      this.isInitialized = false;
      console.log('SecureLogRocket: Uninstalled successfully');
    } catch (error) {
      console.error('SecureLogRocket: Error during uninstall:', error);
    }
  }

  /**
   * Sanitize user info to prevent injection attacks
   */
  private sanitizeUserInfo(info: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(info)) {
      const sanitizedKey = SecureValidation.sanitizeString(String(key));

      if (typeof value === 'string') {
        sanitized[sanitizedKey] = SecureValidation.sanitizeString(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[sanitizedKey] = value;
      } else if (value === null || value === undefined) {
        sanitized[sanitizedKey] = value;
      } else {
        // For complex objects, convert to string and sanitize
        sanitized[sanitizedKey] = SecureValidation.sanitizeString(JSON.stringify(value));
      }
    }

    return sanitized;
  }

  /**
   * Check if LogRocket is initialized
   */
  get isReady(): boolean {
    return this.isInitialized && this.logRocket !== null;
  }

  /**
   * Get the underlying LogRocket instance (use with caution)
   */
  get instance(): LogRocketInstance | null {
    return this.logRocket;
  }
}

// Create and export singleton instance
export const secureLogRocket = new SecureLogRocket();
export default secureLogRocket;
