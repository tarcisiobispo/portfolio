import './react-fix'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/critical.css' // Critical CSS first for LCP
import './index.css'
import './styles/theme-transitions.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/accessibility.css'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { initializeCacheOptimizations } from './utils/cacheOptimization'
import { initializeImageOptimizations } from './utils/imageOptimization'

// Import i18n synchronously to avoid translation errors
import './i18n/config';

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
}

// Render immediately with critical content
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
