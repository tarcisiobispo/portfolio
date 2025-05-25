import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme-transitions.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/accessibility.css'
import './i18n'
import { ThemeProvider } from './components/providers/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
