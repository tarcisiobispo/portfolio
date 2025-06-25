import './react-fix'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/critical.css' // Critical CSS otimizado para LCP (combinado)
import './index.css'
import './styles/theme-transitions.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/ui-combined.css' // UI combinado (accessibility, image-fixes, animation-fixes)
import { ThemeProvider } from './components/providers/ThemeProvider'
import { initializeCacheOptimizations } from './utils/cacheOptimization'
import { initializeImageOptimizations } from './utils/imageOptimization'
import { initializeCSPSecurity } from './utils/cspSecurity'
import { initializeWeb3 } from './utils/web3'

// Import i18n synchronously to avoid translation errors
import i18n from './i18n/config';
import { I18nextProvider } from 'react-i18next';

// Garantir que React está disponível globalmente
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Renderizar app imediatamente para melhor LCP
const root = ReactDOM.createRoot(rootElement);

// Initialize optimizations after DOM is ready
if (typeof window !== 'undefined') {
  // Initialize immediately for critical resources
  initializeCacheOptimizations();
  initializeImageOptimizations();
  
  // Initialize Web3 functionality with graceful fallback
  initializeWeb3();

  // Initialize security after React is loaded
  setTimeout(() => {
    initializeCSPSecurity();
  }, 1000);
}

// Render immediately with critical content
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
