/**
 * Valida URLs usando expressões regulares completas e seguras
 */

/**
 * Valida uma URL genérica
 * @param {string} url - A URL a ser validada
 * @returns {boolean} - Verdadeiro se a URL for válida
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    // Usar o construtor URL para validação básica
    const urlObj = new URL(url);
    
    // Verificar se o protocolo é http ou https
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

/**
 * Valida uma URL do GitHub
 * @param {string} url - A URL do GitHub a ser validada
 * @returns {boolean} - Verdadeiro se a URL for válida
 */
export function isValidGithubUrl(url) {
  if (!isValidUrl(url)) {
    return false;
  }
  
  // Expressão regular para validar URLs do GitHub
  // - Deve começar com https://github.com/
  // - Seguido por nome de usuário (alfanumérico + hífen)
  // - Seguido por nome de repositório (alfanumérico + hífen)
  // - Opcionalmente terminando com .git
  const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(?:\.git)?$/;
  
  return githubRegex.test(url);
}

/**
 * Valida um hostname
 * @param {string} hostname - O hostname a ser validado
 * @returns {boolean} - Verdadeiro se o hostname for válido
 */
export function isValidHostname(hostname) {
  if (!hostname || typeof hostname !== 'string') {
    return false;
  }
  
  // Expressão regular para validar hostnames
  // - Cada segmento pode ter letras, números e hífens
  // - Não pode começar ou terminar com hífen
  // - Comprimento máximo de 63 caracteres por segmento
  // - Último segmento deve ter pelo menos 2 caracteres (TLD)
  // - Implementação segura sem lookbehind para compatibilidade
  
  // Verificar comprimento total
  if (hostname.length > 253) {
    return false;
  }
  
  // Dividir o hostname em segmentos
  const segments = hostname.split('.');
  if (segments.length < 2) {
    return false;
  }
  
  // Verificar cada segmento
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    
    // Verificar comprimento do segmento
    if (segment.length > 63 || segment.length === 0) {
      return false;
    }
    
    // Verificar se o segmento começa ou termina com hífen
    if (segment.startsWith('-') || segment.endsWith('-')) {
      return false;
    }
    
    // Verificar caracteres válidos
    if (!/^[a-zA-Z0-9-]+$/.test(segment)) {
      return false;
    }
  }
  
  // Verificar o TLD (último segmento)
  const tld = segments[segments.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return false;
  }
  
  return true;
}