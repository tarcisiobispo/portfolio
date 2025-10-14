// ConfiguraÃ§Ã£o simplificada e robusta
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    debug: import.meta.env.DEV,

    // Garantir que os objetos sÃ£o retornados corretamente
    returnObjects: true,

    // ConfiguraÃ§Ãµes React
    react: {
      useSuspense: false
    },

    // ConfiguraÃ§Ãµes de interpolaÃ§Ã£o
    interpolation: {
      escapeValue: false
    },

    // ConfiguraÃ§Ãµes bÃ¡sicas
    defaultNS: 'translation',

    // ConfiguraÃ§Ãµes de detecÃ§Ã£o de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })
  .then(() => {
    // i18n initialized successfully - logs removed for production
    if (import.meta.env.DEV) {
      console.log('âœ… i18n initialized successfully');
      console.log('ðŸŒ Current language:', i18n.language);
    }
  })
  .catch((error) => {
    // Only log errors in development
    if (import.meta.env.DEV) {
      console.error('âŒ Error initializing i18n:', error);
    }
  });

export default i18n;
