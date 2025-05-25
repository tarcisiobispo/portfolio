import React, { useEffect } from 'react';
import LogRocket from 'logrocket';
import MicrosoftClarityInit from './MicrosoftClarity';

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

        // Configurar contexto do portfolio para LogRocket
        LogRocket.getSessionURL((sessionURL) => {
          console.log('LogRocket session:', sessionURL);
        });

        // Adicionar informações do portfolio como contexto
        LogRocket.track('Portfolio Visit', {
          portfolioOwner: 'Tarcísio Bispo de Araújo',
          ownerEmail: 'tbisp0@hotmail.com',
          portfolioType: 'UX/Product Designer',
          version: '2024'
        });

      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    } else {
      console.log('Analytics disabled in development mode');
    }
  }, []);

  return (
    <>
      <MicrosoftClarityInit />
      {children}
    </>
  );
};

export default AnalyticsProvider;
