import React, { useEffect } from 'react';
import LogRocket from 'logrocket';
import MicrosoftClarityInit from './MicrosoftClarity';
import { GTMHead, GTMBody } from './GoogleTagManager';
import { ANALYTICS_CONFIG } from '@/config/analytics';

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
        // Analytics initialized successfully - log removed for production

        // Configurar contexto do portfolio para LogRocket
        LogRocket.getSessionURL((sessionURL) => {
          // Session URL available for debugging if needed
        });

        // Adicionar informações do portfolio como contexto
        LogRocket.track('Portfolio Visit', {
          portfolioOwner: 'Tarcísio Bispo de Araújo',
          ownerEmail: 'tbisp0@hotmail.com',
          portfolioType: 'UX/Product Designer',
          version: '2024'
        });

      } catch (error) {
        // Analytics initialization failed - error handling without console logs
        if (import.meta.env.DEV) {
          console.error('Failed to initialize analytics:', error);
        }
      }
    }
    // Analytics disabled in development mode - no console log needed
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <GTMHead gtmId={ANALYTICS_CONFIG.GTM_ID} />
      <GTMBody gtmId={ANALYTICS_CONFIG.GTM_ID} />

      {/* Microsoft Clarity */}
      <MicrosoftClarityInit />

      {children}
    </>
  );
};

export default AnalyticsProvider;
