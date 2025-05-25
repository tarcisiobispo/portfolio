import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuração robusta do i18n com HTTP backend
i18n
  .use(Backend) // ESSENCIAL: Carrega arquivos JSON via HTTP
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Configurações de idioma
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',

    // DEBUG HABILITADO para diagnóstico completo
    debug: true,

    // Configuração do backend HTTP
    backend: {
      loadPath: '/portfolio/locales/{{lng}}.json', // Caminho absoluto com basename
      requestOptions: {
        cache: 'no-cache', // Evita problemas de cache
        mode: 'cors' // Permite CORS se necessário
      }
    },

    // Configurações React
    react: {
      useSuspense: false // Evita problemas de carregamento assíncrono
    },

    // Configurações de interpolação
    interpolation: {
      escapeValue: false // React já faz escape por padrão
    },

    // Configurações de namespace
    defaultNS: 'translation',
    ns: ['translation'],

    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    // Configurações de fallback
    supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
    nonExplicitSupportedLngs: true,

    // Configurações adicionais para produção
    load: 'languageOnly',
    cleanCode: true,

    // Configurações de carregamento
    initImmediate: false, // Não inicializar imediatamente
    preload: ['pt-BR'] // Pré-carregar idioma padrão
  })
  .then(() => {
    console.log('✅ i18n initialized successfully with HTTP backend');
    console.log('🌐 Current language:', i18n.language);
    console.log('📊 Available resources:', i18n.hasResourceBundle('pt-BR', 'translation'));
    console.log('🔍 Sample translation test:', i18n.t('profile.title'));
  })
  .catch((error) => {
    console.error('❌ Error initializing i18n:', error);
    console.error('🔍 Check if locales files exist at /portfolio/locales/');
  });

export default i18n;
