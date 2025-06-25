import { useEffect } from 'react';

/**
 * Microsoft Clarity Analytics Component
 * Only initializes in production environment to avoid CORS issues in development
 */
const MicrosoftClarityInit: React.FC = () => {
  useEffect(() => {
    // Only initialize in production and in browser environment
    if (import.meta.env.PROD && typeof window !== 'undefined') {
      try {
        // Check if already initialized
        if (window.clarity) {
          console.log('Microsoft Clarity already initialized');
          return;
        }

        // Create script element
        const clarityScript = document.createElement('script');
        clarityScript.type = 'text/javascript';
        
        // Set up Clarity with error handling
        clarityScript.innerHTML = `
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
              
              console.log('Microsoft Clarity initialized successfully');
            } catch (e) {
              console.error('Error initializing Clarity:', e);
            }
          })(window, document, 'clarity', 'script', 'rp64ayubme');
        `;
        
        // Add error handling for script loading
        clarityScript.onerror = () => {
          console.error('Failed to load Microsoft Clarity script');
        };
        
        document.head.appendChild(clarityScript);
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    } else if (!import.meta.env.PROD) {
      console.log('Microsoft Clarity is disabled in development mode');
    }
  }, []);

  return null; // This component doesn't render anything
};

export default MicrosoftClarityInit;