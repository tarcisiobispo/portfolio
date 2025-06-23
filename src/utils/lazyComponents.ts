/**
 * Lazy loading optimization for components
 * Reduces initial bundle size by loading components on demand
 * 
 * Refactored to group related components and simplify imports
 */

import React, { lazy, Suspense, Component, ReactNode, ComponentType, LazyExoticComponent } from 'react';
import { JSX } from 'react/jsx-runtime';

/**
 * Grouped lazy components by category
 * This makes the code more maintainable and easier to understand
 */

/**
 * Cria um componente lazy com tratamento de erro
 */
const lazyWithRetry = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return lazy(async (): Promise<{ default: T }> => {
    try {
      return await factory();
    } catch (error) {
      console.error('Erro ao carregar componente:', error);
      // Retorna um componente vazio em caso de erro
      const FallbackComponent: T = (() => {
        console.error('Componente não pôde ser carregado');
        return null;
      }) as unknown as T;
      return { default: FallbackComponent };
    }
  });
};

// Content components - main sections of the site
export const ContentComponents = {
  ProjectShowcase: lazyWithRetry(() => import('../components/ProjectShowcase')),
  BacklogCycle: lazyWithRetry(() => import('../components/BacklogCycle')),
  Contact: lazyWithRetry(() => import('../components/Contact'))
};

// UI components - interface elements
export const UIComponents = {
  FeedbackModal: lazyWithRetry(() => import('../components/FeedbackModal')),
  FluidGradientBackground: lazyWithRetry(() => import('../components/FluidGradientBackground')),
  BackToTop: lazyWithRetry(() => import('../components/ui/BackToTop')),
  CookieConsent: lazyWithRetry(() => import('../components/CookieConsent'))
};

// Page components - full pages
export const PageComponents = {
  PrivacyPolicy: lazyWithRetry(() => import('../pages/PrivacyPolicy')),
  NotFound: lazyWithRetry(() => import('../pages/NotFound')),
  Index: lazyWithRetry(() => import('../pages/Index'))
};

// Analytics and tracking components
export const AnalyticsComponents = {
  AnalyticsProvider: lazyWithRetry(() => import('../components/analytics/AnalyticsProvider')),
  LazyScripts: lazyWithRetry(() => import('../components/LazyScripts'))
};

// For backward compatibility - individual exports
// These can be gradually phased out as code is updated
export const LazyProjectShowcase = ContentComponents.ProjectShowcase;
export const LazyBacklogCycle = ContentComponents.BacklogCycle;
export const LazyContact = ContentComponents.Contact;
export const LazyFeedbackModal = UIComponents.FeedbackModal;
export const LazyPrivacyPolicy = PageComponents.PrivacyPolicy;
export const LazyAnalyticsProvider = AnalyticsComponents.AnalyticsProvider;
export const LazyFluidGradientBackground = UIComponents.FluidGradientBackground;

/**
 * Improved preload strategy
 * Groups preloading by component category and user interaction stage
 */
export const preloadComponents = () => {
  // Preload content components after initial page load
  const preloadContentComponents = () => {
    setTimeout(() => {
      import('../components/ProjectShowcase');
      import('../components/BacklogCycle');
    }, 2000);
  };

  // Preload interaction components after user engagement
  const preloadInteractionComponents = () => {
    import('../components/Contact');
    import('../components/FeedbackModal');
  };

  // Execute initial preload
  preloadContentComponents();

  // Set up interaction-based preloading
  let hasPreloaded = false;
  const handleInteraction = () => {
    if (!hasPreloaded) {
      preloadInteractionComponents();
      hasPreloaded = true;
      
      // Clean up event listeners
      ['scroll', 'mousemove', 'touchstart'].forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    }
  };

  // Add event listeners with passive flag for performance
  ['scroll', 'mousemove', 'touchstart'].forEach(event => {
    window.addEventListener(event, handleInteraction, { passive: true });
  });
};

/**
 * Error handling for lazy-loaded components
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        className: 'p-4 bg-red-50 border-l-4 border-red-400',
        children: [
          React.createElement('div', {
            className: 'flex',
            children: [
              React.createElement('div', {
                className: 'flex-shrink-0',
                children: React.createElement('svg', {
                  className: 'h-5 w-5 text-red-400',
                  viewBox: '0 0 20 20',
                  fill: 'currentColor',
                  children: React.createElement('path', {
                    fillRule: 'evenodd',
                    d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
                    clipRule: 'evenodd'
                  })
                })
              }),
              React.createElement('div', {
                className: 'ml-3',
                children: React.createElement('p', {
                  className: 'text-sm text-red-700',
                  children: 'Ocorreu um erro ao carregar este componente. Por favor, tente novamente.'
                })
              })
            ]
          })
        ]
      });
    }

    return this.props.children;
  }
}

/**
 * Enhanced component wrapper with error boundary and loading state
 * Can be used with any lazy-loaded component
 */
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>, 
  loadingMessage: string = 'Carregando...'
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const fallback = React.createElement('div', {
      className: 'flex items-center justify-center p-4',
      children: loadingMessage
    });

    const errorBoundary = React.createElement(
      ErrorBoundary,
      { children: React.createElement(Component, props) },
      null
    );

    return React.createElement(Suspense, { fallback }, errorBoundary);
  };
  return WrappedComponent;
};

/**
 * Optimized library imports
 * Only imports the specific components needed from each library
 * Grouped by functionality for better organization
 */
export const optimizedImports = {
  // Animation components (Framer Motion)
  animation: {
    // Core animation components
    motion: () => import('framer-motion').then(mod => ({
      motion: mod.motion,
      AnimatePresence: mod.AnimatePresence,
      useAnimation: mod.useAnimation,
      useInView: mod.useInView
    })),
  },
  
  // UI components (Lucide icons)
  ui: {
    // Common icons used throughout the application
    icons: () => import('lucide-react').then(mod => ({
      // Navigation icons
      Menu: mod.Menu,
      X: mod.X,
      ChevronDown: mod.ChevronDown,
      ChevronUp: mod.ChevronUp,
      ArrowUp: mod.ArrowUp,
      
      // Theme icons
      Sun: mod.Sun,
      Moon: mod.Moon,
      
      // Content icons
      Globe: mod.Globe,
      Eye: mod.Eye,
      ExternalLink: mod.ExternalLink,
      
      // Contact icons
      Mail: mod.Mail,
      Phone: mod.Phone,
      MapPin: mod.MapPin,
      Linkedin: mod.Linkedin,
      Send: mod.Send,
      
      // Feedback icons
      Check: mod.Check,
      AlertCircle: mod.AlertCircle
    })),
  },
  
  // Form components (React Hook Form)
  forms: {
    // Core form handling
    hookForm: () => import('react-hook-form').then(mod => ({
      useForm: mod.useForm,
      Controller: mod.Controller
    }))
  }
};

/**
 * Development utilities
 */
export const devUtils = {
  // Bundle analyzer helper for development
  analyzeBundles: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bundle analysis available in production build');
    }
  }
};

// Export the bundle analyzer for backward compatibility
export const analyzeBundles = devUtils.analyzeBundles;
