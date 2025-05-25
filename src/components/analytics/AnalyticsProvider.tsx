import React, { useEffect } from 'react';
import LogRocket from 'logrocket';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  useEffect(() => {
    // Inicializar analytics apenas em produção
    if (import.meta.env.PROD) {
      try {
        // LogRocket
        LogRocket.init('fatqpp/portfolio-kbfin');
        console.log('Analytics initialized successfully');
        
        // Identificar usuário para LogRocket (opcional)
        LogRocket.identify('portfolio-visitor', {
          name: 'Portfolio Visitor',
          email: 'visitor@portfolio.com',
        });
        
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    } else {
      console.log('Analytics disabled in development mode');
    }
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;
