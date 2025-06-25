import { lazy, ComponentType, Suspense, ReactNode, FC } from 'react';

interface LazyWithRetryOptions {
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Initial retry interval in milliseconds (default: 1000ms) */
  interval?: number;
  /** Custom error handler */
  onError?: (error: unknown, attempt: number) => void;
}

/**
 * Creates a lazy-loaded component with retry logic
 * @param factory Function that returns a dynamic import() of the component
 * @param options Configuration options for retry behavior
 * @returns Lazy-loaded component with retry support
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyWithRetryOptions = {}
) {
  const { 
    retries = 3, 
    interval = 1000,
    onError 
  } = options;

  return lazy(async () => {
    let lastError: unknown;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        const attempt = i + 1;
        
        if (onError) {
          onError(error, attempt);
        } else {
          console.warn(`Failed to load chunk (attempt ${attempt}/${retries}):`, error);
        }
        
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, interval * (i + 1)));
        }
      }
    }
    
    console.error('Failed to load chunk after retries:', lastError);
    throw lastError;
  });
}

/**
 * Higher-order component that wraps a component with Suspense
 * @param Component The component to wrap with Suspense
 * @param fallback Fallback UI to show while loading
 * @returns Component wrapped with Suspense
 */
export function withSuspense<P extends object>(
  Component: ComponentType<P>,
  fallback: ReactNode = null
): FC<P> {
  const WrappedComponent: FC<P> = (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
  
  const componentName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `withSuspense(${componentName})`;
  
  return WrappedComponent;
}

/**
 * Helper to create a lazy-loaded component with Suspense
 * @param factory Function that returns a dynamic import() of the component
 * @param options Configuration options for lazy loading and Suspense
 * @returns Object containing the lazy component and its wrapped version
 */
export function createLazyComponent<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyWithRetryOptions & { fallback?: ReactNode } = {}
) {
  const { fallback, ...lazyOptions } = options;
  const LazyComponent = lazyWithRetry(factory, lazyOptions);
  
  return {
    LazyComponent,
    LazyWithSuspense: withSuspense(LazyComponent, fallback)
  };
}
