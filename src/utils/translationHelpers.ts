// Utilitários para lidar com traduções de forma segura

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
    return ensureArray(result);
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error);
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
    console.warn(`Translation error for key "${key}":`, error);
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
    console.warn(`Translation error for key "${key}[${index}]":`, error);
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
