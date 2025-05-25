import './react-fix'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme-transitions.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/accessibility.css'
import './i18n' // Inicializar i18n
import { ThemeProvider } from './components/providers/ThemeProvider'

// Garantir que React está disponível globalmente
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Renderizar app diretamente - i18n já está configurado
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
