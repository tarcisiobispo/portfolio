import React, { useEffect, useCallback } from 'react';
import { secureLogRocket } from '@/utils/secureLogRocket';
import MicrosoftClarityInit from './MicrosoftClarity';
import { GTMHead, GTMBody } from './GoogleTagManager';
import { ANALYTICS_CONFIG } from '@/config/analytics';
import ErrorBoundary, { withErrorBoundary } from '../ErrorBoundary';

interface AnalyticsProviderProps {
  children?: React.ReactNode;
}

// Componente de fallback para erros de analytics
const AnalyticsFallback = () => {
  // Não renderiza nada em produção para evitar erros visíveis
  if (import.meta.env.PROD) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-xs text-sm rounded shadow-lg z-50">
      <p className="font-bold">Analytics Desativado</p>
      <p>Os serviços de análise estão desativados no modo de desenvolvimento ou ocorreu um erro.</p>
    </div>
  );
};

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const handleAnalyticsError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Analytics Error:', error, errorInfo);
    // Aqui você pode adicionar lógica para reportar o erro a um serviço de monitoramento
  }, []);

  useEffect(() => {
    // Função para inicialização segura dos serviços de analytics
    const initializeAnalytics = async () => {
      if (!import.meta.env.PROD) {
        console.log('Analytics desativado em modo de desenvolvimento');
        return;
      }

      try {
        // Inicializar LogRocket com tratamento de erros
        if (typeof secureLogRocket?.init === 'function') {
          try {
            secureLogRocket.init('fatqpp/portfolio-kbfin', {
              shouldAugmentNPS: false,
              shouldParseXHRBlob: false,
              network: {
                isEnabled: true,
                requestSanitizer: (request: any) => {
                  if (!request?.url) return request;
                  
                  try {
                    const url = new URL(request.url);
                    const allowedDomains = [
                      'tarcisiobispo.github.io',
                      'logrocket.com',
                      'logrocket.io',
                      'clarity.ms',
                      'clarity.microsoft.com',
                      'google-analytics.com',
                      'googletagmanager.com'
                    ];
                    
                    const isAllowed = allowedDomains.some(domain => 
                      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
                    );
                    
                    return isAllowed ? request : null;
                  } catch (e) {
                    return null;
                  }
                }
              }
            });
            
            // Identificar o usuário de forma segura
            secureLogRocket.identify('portfolio-visitor', {
              type: 'portfolio-visitor',
              firstVisit: !localStorage.getItem('hasVisitedBefore')
            });
            
            localStorage.setItem('hasVisitedBefore', 'true');
          } catch (error) {
            console.error('Falha ao inicializar LogRocket:', error);
          }
        }
      } catch (error) {
        console.error('Erro na inicialização dos serviços de analytics:', error);
      }
    };

    initializeAnalytics();
  }, []);

  // Renderizar os componentes de analytics dentro de ErrorBoundary
  return (
    <>
      <ErrorBoundary 
        onError={handleAnalyticsError}
        fallback={<AnalyticsFallback />}
      >
        {import.meta.env.PROD && (
          <>
            <GTMHead gtmId={ANALYTICS_CONFIG.GTM_ID} />
            <GTMBody gtmId={ANALYTICS_CONFIG.GTM_ID} />
            <MicrosoftClarityInit />
          </>
        )}
      </ErrorBoundary>
      
      {/* Conteúdo principal da aplicação */}
      {children}
    </>
  );
};

// Exportar o componente envolvido com ErrorBoundary
export default withErrorBoundary(
  AnalyticsProvider,
  AnalyticsFallback,
  (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Erro no AnalyticsProvider:', error, errorInfo);
  }
);
