import React, { useEffect, useState } from 'react';
import type { GtagFunction } from '../types/global';

/**
 * LazyScripts Component
 * Loads third-party scripts only when needed to reduce initial bundle size
 */

interface LazyScriptsProps {
  enableAnalytics?: boolean;
  enableGTM?: boolean;
  enableClarity?: boolean;
  delay?: number;
}

const LazyScripts: React.FC<LazyScriptsProps> = ({
  enableAnalytics = true,
  enableGTM = true,
  enableClarity = true,
  delay = 3000 // 3 seconds delay
}) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Only load scripts in production
    if (!import.meta.env.PROD) {
      return;
    }

    // Delay script loading to improve initial page load
    const timer = setTimeout(() => {
      loadScripts();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const loadScripts = async () => {
    try {
      // Load scripts in sequence to avoid blocking
      if (enableAnalytics) {
        await loadGoogleAnalytics();
      }

      if (enableGTM) {
        await loadGoogleTagManager();
      }

      if (enableClarity) {
        await loadMicrosoftClarity();
      }

      setScriptsLoaded(true);
      console.log('Third-party scripts loaded successfully');
    } catch (error) {
      console.warn('Failed to load some third-party scripts:', error);
    }
  };

  const ensureGtagStub = () => {
    if (!('gtag' in window)) {
      // Lightweight stub so calls won't error even if GA script is blocked by an ad-blocker
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function(){
        (window as any).dataLayer.push(arguments);
      } as GtagFunction;
    }
  };

  const loadGoogleAnalytics = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      ensureGtagStub();
      if (window.gtag) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3QCW5SKK73';
      script.onload = () => {
        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        const gtag: GtagFunction = function(command: string, action: string, params?: any) {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date().toISOString());
        window.gtag('config', 'G-3QCW5SKK73', {
          page_title: document.title,
          page_location: window.location.href
        });
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadGoogleTagManager = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google_tag_manager) {
        resolve();
        return;
      }

      // GTM script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-M2NFRBD9';
      script.onload = () => {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);

      // GTM noscript fallback
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-M2NFRBD9';
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.appendChild(noscript);
    });
  };

  const loadMicrosoftClarity = (): Promise<void> => {
    return new Promise((resolve) => {
      // Only load in production
      if (!import.meta.env.PROD) {
        console.log('Microsoft Clarity loading skipped in development');
        resolve();
        return;
      }

      // Check if already loaded
      if (window.clarity) {
        console.log('Microsoft Clarity already loaded');
        resolve();
        return;
      }

      // Create script element with error handling
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      // Use a more reliable initialization method
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          try {
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            
            // Set a flag to track if Clarity is ready
            c['clarityReady'] = true;
            
            // Queue initialization
            c[a]('identify', 'tarcisio-portfolio', 'Tarcísio Bispo Portfolio');
            c[a]('set', 'portfolio_owner', 'Tarcisio Bispo de Araujo');
            c[a]('set', 'portfolio_type', 'UX/Product Designer');
            c[a]('set', 'portfolio_version', '2024');
            c[a]('set', 'site_language', 'multi');
            c[a]('event', 'portfolio_initialized');
          } catch(e) {
            console.error('Error initializing Clarity:', e);
          }
        })(window, document, 'clarity', 'script', 'rp64ayubme');
      `;
      
      script.onload = () => {
        console.log('Microsoft Clarity script loaded successfully');
        resolve();
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Microsoft Clarity script:', error);
        resolve(); // Resolve instead of reject to prevent blocking other scripts
      };
      
      document.head.appendChild(script);
    });
  };

  // Don't render anything visible
  return null;
};

// Window interface is now extended in src/types/global.d.ts

export default LazyScripts;
