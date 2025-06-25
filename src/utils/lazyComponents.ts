import { lazy, ComponentType } from 'react';

/**
 * @deprecated Use `lazyWithRetry` from './lazyWithRetry' instead
 * 
 * Creates a lazy-loaded component with retry logic
 * @param factory Function that returns a dynamic import() of the component
 * @param retries Number of retry attempts (default: 3)
 * @param interval Initial retry interval in milliseconds (default: 1000ms)
 * @returns Lazy-loaded component with retry support
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = 3,
  interval = 1000
) {
  return lazy(async () => {
    let lastError: unknown;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        console.warn(`Failed to load chunk (attempt ${i + 1}/${retries}):`, error);
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, interval * (i + 1)));
        }
      }
    }
    
    console.error('Failed to load chunk after retries:', lastError);
    throw lastError;
  });
}

export default {
  lazyWithRetry
};
