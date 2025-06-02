/**
 * Valida um hostname usando uma expressão regular completa
 * @param {string} hostname - O hostname a ser validado
 * @returns {boolean} - Verdadeiro se o hostname for válido
 */
export function validateHostname(hostname) {
  if (!hostname || typeof hostname !== 'string') {
    return false;
  }
  
  // Expressão regular completa para validar hostnames
  // - Permite letras, números, hífens
  // - Não permite hífens no início ou fim de segmentos
  // - Verifica comprimento máximo de 253 caracteres
  // - Verifica comprimento máximo de 63 caracteres por segmento
  const hostnameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63}(?<!-))*(\.[A-Za-z]{2,})$/;
  
  return hostnameRegex.test(hostname) && hostname.length <= 253;
}