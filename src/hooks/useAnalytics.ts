import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ANALYTICS_CONFIG, PORTFOLIO_EVENTS, GTMEvent } from '@/config/analytics';

// Hook para analytics do portfolio
export const useAnalytics = () => {
  // Usar try/catch para evitar erro quando fora do Router context
  let location;
  try {
    location = useLocation();
  } catch {
    location = { pathname: '/' };
  }

  // Função para enviar eventos ao GTM
  const sendEvent = useCallback((event: GTMEvent) => {
    if (!ANALYTICS_CONFIG.ENABLED || typeof window === 'undefined') {
      return;
    }

    // Enviar para dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ...event,
      page_location: window.location.href,
      page_path: location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Log em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', event);
    }
  }, [location.pathname]);

  // Tracking de navegação
  const trackNavigation = useCallback((section: string) => {
    sendEvent(PORTFOLIO_EVENTS.navigateToSection(section));
  }, [sendEvent]);

  // Tracking de projetos
  const trackProjectView = useCallback((projectName: string) => {
    sendEvent(PORTFOLIO_EVENTS.viewProject(projectName));
  }, [sendEvent]);

  // Tracking de formulário de contato
  const trackContactForm = useCallback((formType: string = 'contact') => {
    sendEvent(PORTFOLIO_EVENTS.submitContactForm(formType));
  }, [sendEvent]);

  // Tracking de download de CV
  const trackCVDownload = useCallback(() => {
    sendEvent(PORTFOLIO_EVENTS.downloadCV());
  }, [sendEvent]);

  // Tracking de redes sociais
  const trackSocialClick = useCallback((platform: string) => {
    sendEvent(PORTFOLIO_EVENTS.clickSocialMedia(platform));
  }, [sendEvent]);

  // Tracking de acessibilidade
  const trackAccessibilityToggle = useCallback((feature: string, enabled: boolean) => {
    sendEvent(PORTFOLIO_EVENTS.toggleAccessibility(feature, enabled));
  }, [sendEvent]);

  // Tracking de mudança de tema
  const trackThemeChange = useCallback((theme: string) => {
    sendEvent(PORTFOLIO_EVENTS.changeTheme(theme));
  }, [sendEvent]);

  // Tracking de mudança de idioma
  const trackLanguageChange = useCallback((language: string) => {
    sendEvent(PORTFOLIO_EVENTS.changeLanguage(language));
  }, [sendEvent]);

  // Tracking de cliques em botões
  const trackButtonClick = useCallback((buttonName: string, section?: string) => {
    sendEvent({
      event: ANALYTICS_CONFIG.EVENTS.BUTTON_CLICK,
      event_category: ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
      event_label: buttonName,
      custom_parameters: {
        section: section || 'unknown',
        button_type: 'cta',
      },
    });
  }, [sendEvent]);

  // Tracking de links externos com validação segura
  const trackExternalLink = useCallback((url: string, linkText?: string) => {
    let linkDomain = 'unknown';

    try {
      // Validação rigorosa de URL
      const parsedUrl = new URL(url);

      // Verificar se é HTTPS
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        console.warn('URL com protocolo não permitido:', url);
        return;
      }

      linkDomain = parsedUrl.hostname;
    } catch (error) {
      console.warn('URL inválida para tracking:', url);
      return;
    }

    sendEvent({
      event: ANALYTICS_CONFIG.EVENTS.EXTERNAL_LINK,
      event_category: ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
      event_label: linkText || url,
      custom_parameters: {
        destination_url: url,
        link_domain: linkDomain,
      },
    });
  }, [sendEvent]);

  // Tracking de erros
  const trackError = useCallback((errorMessage: string, errorType?: string) => {
    sendEvent({
      event: ANALYTICS_CONFIG.EVENTS.ERROR,
      event_category: ANALYTICS_CONFIG.CATEGORIES.ERROR,
      event_label: errorMessage,
      custom_parameters: {
        error_type: errorType || 'javascript_error',
        page_path: location.pathname,
      },
    });
  }, [sendEvent, location.pathname]);

  // Tracking de performance
  const trackPerformance = useCallback((metricName: string, value: number, unit?: string) => {
    sendEvent({
      event: ANALYTICS_CONFIG.EVENTS.PERFORMANCE_METRIC,
      event_category: ANALYTICS_CONFIG.CATEGORIES.PERFORMANCE,
      event_label: metricName,
      value: Math.round(value),
      custom_parameters: {
        metric_unit: unit || 'ms',
        page_path: location.pathname,
      },
    });
  }, [sendEvent, location.pathname]);

  return {
    // Eventos específicos do portfolio
    trackNavigation,
    trackProjectView,
    trackContactForm,
    trackCVDownload,
    trackSocialClick,
    trackAccessibilityToggle,
    trackThemeChange,
    trackLanguageChange,

    // Eventos gerais
    trackButtonClick,
    trackExternalLink,
    trackError,
    trackPerformance,

    // Função genérica
    sendEvent,
  };
};

// Hook para tracking automático de page views
export const usePageTracking = () => {
  // Usar try/catch para evitar erro quando fora do Router context
  let location;
  try {
    location = useLocation();
  } catch {
    location = { pathname: '/' };
  }

  const trackPageView = useCallback(() => {
    if (!ANALYTICS_CONFIG.ENABLED || typeof window === 'undefined') {
      return;
    }

    // Enviar page view para GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: ANALYTICS_CONFIG.EVENTS.PAGE_VIEW,
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      timestamp: new Date().toISOString(),
    });

    // Log em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('📄 Page View:', location.pathname);
    }
  }, [location.pathname]);

  return { trackPageView };
};
