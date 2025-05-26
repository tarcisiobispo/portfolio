import { useEffect } from 'react';

/**
 * Critical CSS Component
 * Loads non-critical CSS after main content is rendered
 * to reduce render-blocking resources
 */
const CriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS after main thread is less busy
    const loadNonCriticalCSS = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          loadCSS();
        });
      } else {
        setTimeout(loadCSS, 100);
      }
    };

    const loadCSS = () => {
      // Load animation CSS only when needed
      const animationCSS = document.createElement('link');
      animationCSS.rel = 'stylesheet';
      animationCSS.href = '/portfolio/css/animations.css';
      animationCSS.media = 'all';
      document.head.appendChild(animationCSS);

      // Load print CSS
      const printCSS = document.createElement('link');
      printCSS.rel = 'stylesheet';
      printCSS.href = '/portfolio/css/print.css';
      printCSS.media = 'print';
      document.head.appendChild(printCSS);
    };

    loadNonCriticalCSS();
  }, []);

  return null;
};

export default CriticalCSS;
