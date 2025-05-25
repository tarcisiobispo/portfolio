import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar os recursos de tradução diretamente
import ptBRData from './locales/pt-BR';
import enUSData from './locales/en-US.json';
import esESData from './locales/es-ES.json';

// Recursos de tradução
const resources = {
  'pt-BR': {
    translation: ptBRData
  },
  'en-US': {
    translation: enUSData
  },
  'es-ES': {
    translation: esESData
  }
};

// Inicializar i18n de forma robusta
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        lng: 'pt-BR', // idioma padrão
        fallbackLng: 'pt-BR',

        interpolation: {
          escapeValue: false // React já faz escape por padrão
        },

        // Configurações para desenvolvimento
        debug: import.meta.env.DEV,

        // Configurações de namespace
        defaultNS: 'translation',
        ns: ['translation'],

        // Configurações de detecção de idioma
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng'
        },

        // Configurações adicionais para produção
        load: 'languageOnly',
        cleanCode: true,

        // Garantir que as traduções estão carregadas
        initImmediate: false,

        // Configurações de fallback
        supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
        nonExplicitSupportedLngs: true
      });

    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Error initializing i18n:', error);
    // Fallback para configuração mínima
    await i18n.init({
      lng: 'pt-BR',
      fallbackLng: 'pt-BR',
      resources,
      interpolation: {
        escapeValue: false
      }
    });
  }
};

// Inicializar imediatamente
initI18n();

export default i18n;
