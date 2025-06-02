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
  return /^https?:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
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
  return /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63}(?<!-))*(\.[A-Za-z]{2,})$/;
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
  
  const urlRegex = createSecureUrlRegex();
  return urlRegex.test(url);
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
  
  const hostnameRegex = createSecureHostnameRegex();
  return hostnameRegex.test(hostname) && hostname.length <= 253;
}