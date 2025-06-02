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
  const hostnameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63}(?<!-))*(\.[A-Za-z]{2,})$/;
  
  return hostnameRegex.test(hostname) && hostname.length <= 253;
}