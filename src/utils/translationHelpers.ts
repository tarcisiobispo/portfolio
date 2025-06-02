// Utilitários para lidar com traduções de forma segura
import { logger } from './logger';
import i18n from '@/i18n/config';

/**
 * Garante que o resultado de uma tradução seja um array
 * Útil para quando usamos returnObjects: true e esperamos um array
 */
export const ensureArray = <T = any>(value: any): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === null || value === undefined || value === '') {
    return [];
  }

  // Se for uma string ou objeto, coloca em um array
  return [value];
};

/**
 * Função para obter itens de fallback do idioma padrão (pt-BR)
 * Útil quando um idioma não tem todos os itens necessários
 */
export const getFallbackItems = (key: string): any[] => {
  try {
    // Obter os itens do idioma padrão (pt-BR)
    const defaultItems = i18n.getResourceBundle('pt-BR', 'translation');
    
    // Navegar pela estrutura de chaves (ex: 'backlog.items')
    const keys = key.split('.');
    let result = defaultItems;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return [];
      }
    }
    
    return ensureArray(result);
  } catch (error) {
    logger.warn(`Error getting fallback items for "${key}":`, error);
    return [];
  }
};

/**
 * Garante que o resultado de uma tradução seja um array de strings
 * Remove valores falsy (null, undefined, '')
 */
export const ensureStringArray = (value: any): string[] => {
  const array = ensureArray<string>(value);
  return array.filter(item => item && typeof item === 'string');
};

/**
 * Hook personalizado para traduções que retornam arrays
 * Garante que sempre temos um array válido para usar com .map()
 */
export const useTranslationArray = (key: string, t: (key: string, options?: any) => any): any[] => {
  try {
    const result = t(key, { returnObjects: true });

    // Debug detalhado para verificar o que está sendo retornado
    if (import.meta.env.DEV && key === 'backlog.items') {
      console.log('🔍 Debug backlog.items:', {
        key,
        language: i18n.language,
        result,
        type: typeof result,
        isArray: Array.isArray(result),
        length: Array.isArray(result) ? result.length : 'N/A'
      });
    }

    // Garantir que sempre retornamos um array, mesmo que vazio
    let arrayResult = ensureArray(result);
    
    // Se o array estiver vazio ou tiver menos itens que o esperado (para backlog.items)
    if ((key === 'backlog.items' && arrayResult.length < 8) || arrayResult.length === 0) {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Poucos itens para "${key}" no idioma ${i18n.language}, usando fallback...`);
      }
      
      // Obter itens do idioma padrão (pt-BR)
      const fallbackItems = getFallbackItems(key);
      
      if (fallbackItems.length > 0) {
        if (import.meta.env.DEV) {
          console.log(`✅ Usando ${fallbackItems.length} itens de fallback para "${key}"`);
        }
        arrayResult = fallbackItems;
      }
    }
    
    // Log adicional para depuração
    if (import.meta.env.DEV && key === 'backlog.items') {
      console.log(`📊 Array final (${arrayResult.length} itens)`);
    }
    
    return arrayResult;
  } catch (error) {
    logger.warn(`Translation error for key "${key}":`, error);
    
    // Em caso de erro, tentar usar o fallback
    const fallbackItems = getFallbackItems(key);
    if (fallbackItems.length > 0) {
      if (import.meta.env.DEV) {
        console.log(`🔄 Usando fallback após erro para "${key}"`);
      }
      return fallbackItems;
    }
    
    return [];
  }
};

/**
 * Função para obter traduções de objetos de forma segura
 * Retorna um objeto vazio se a tradução falhar
 */
export const getTranslationObject = (key: string, t: (key: string, options?: any) => any): Record<string, any> => {
  try {
    const result = t(key, { returnObjects: true });
    return typeof result === 'object' && result !== null ? result : {};
  } catch (error) {
    logger.warn(`Translation error for key "${key}":`, error);
    return {};
  }
};

/**
 * Função para obter uma tradução específica de um array
 * Com fallback para evitar erros
 */
export const getArrayTranslation = (
  key: string,
  index: number,
  t: (key: string, options?: any) => any,
  fallback: string = ''
): string => {
  try {
    const array = ensureStringArray(t(key, { returnObjects: true }));
    return array[index] || fallback;
  } catch (error) {
    logger.warn(`Translation error for key "${key}[${index}]":`, error);
    return fallback;
  }
};

/**
 * Função para verificar se uma tradução existe e é válida
 */
export const hasValidTranslation = (key: string, t: (key: string, options?: any) => any): boolean => {
  try {
    const result = t(key);
    return result && result !== key; // i18next retorna a key se não encontrar tradução
  } catch (error) {
    return false;
  }
};

/**
 * Função para obter traduções com fallback
 */
export const getTranslationWithFallback = (
  key: string,
  fallback: string,
  t: (key: string, options?: any) => any
): string => {
  try {
    const result = t(key);
    return (result && result !== key) ? result : fallback;
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error);
    return fallback;
  }
};
