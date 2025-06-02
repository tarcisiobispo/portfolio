/**
 * Valida um hostname usando uma implementação robusta
 * @param {string} hostname - O hostname a ser validado
 * @returns {boolean} - Verdadeiro se o hostname for válido
 */
export function validateHostname(hostname) {
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
    // - Deve começar e terminar com letra ou número
    // - Pode conter hífens no meio
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(segment)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Valida uma URL usando validação robusta
 * @param {string} url - A URL a ser validada
 * @returns {boolean} - Verdadeiro se a URL for válida
 */
export function validateUrl(url) {
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
    if (!validateHostname(urlObj.hostname)) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}