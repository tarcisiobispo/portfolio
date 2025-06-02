/**
 * Utilitário para criar expressões regulares seguras para validação de URLs e hostnames
 */

/**
 * Cria uma expressão regular segura para validar URLs
 * @returns {RegExp} Expressão regular para validação de URLs
 */
export function createSecureUrlRegex() {
  // Expressão regular segura para validar URLs
  // - Protocolo: http ou https
  // - Hostname: letras, números, hífens, pontos (com restrições)
  // - Caminho: caracteres válidos em URLs
  // - Parâmetros de consulta: caracteres válidos em URLs
  return new RegExp(
    '^https?:\\/\\/' + // Protocolo
    '(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+' + // Subdomínios
    '[a-zA-Z]{2,}' + // TLD
    '(?:\\/[a-zA-Z0-9\\-._~:\\/?#[\\]@!$&\'()*+,;=]*)?' + // Caminho
    '$'
  );
}

/**
 * Cria uma expressão regular segura para validar hostnames
 * @returns {RegExp} Expressão regular para validação de hostnames
 */
export function createSecureHostnameRegex() {
  // Expressão regular segura para validar hostnames
  // - Cada segmento pode ter letras, números e hífens
  // - Não pode começar ou terminar com hífen
  // - Comprimento máximo de 63 caracteres por segmento
  // - Último segmento deve ter pelo menos 2 caracteres (TLD)
  // - Implementação segura sem lookbehind para compatibilidade
  const segmentRegex = '(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)';
  const tldRegex = '(?:[a-zA-Z]{2,})';
  
  return new RegExp(
    '^' + 
    segmentRegex + 
    '(?:\\.' + segmentRegex + ')*' + 
    '\\.' + tldRegex + 
    '$'
  );
}

/**
 * Valida uma URL usando uma expressão regular segura
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
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Validar o hostname
    if (!isValidHostname(urlObj.hostname)) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Valida um hostname usando uma expressão regular segura
 * @param {string} hostname - O hostname a ser validado
 * @returns {boolean} - Verdadeiro se o hostname for válido
 */
export function isValidHostname(hostname) {
  if (!hostname || typeof hostname !== 'string') {
    return false;
  }
  
  // Verificar comprimento total
  if (hostname.length > 253) {
    return false;
  }
  
  // Verificar cada segmento
  const segments = hostname.split('.');
  if (segments.length < 2) {
    return false;
  }
  
  // Verificar o TLD (último segmento)
  const tld = segments[segments.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return false;
  }
  
  // Verificar cada segmento
  for (const segment of segments) {
    // Verificar comprimento do segmento
    if (segment.length > 63 || segment.length === 0) {
      return false;
    }
    
    // Verificar caracteres válidos e restrições
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(segment)) {
      return false;
    }
  }
  
  return true;
}