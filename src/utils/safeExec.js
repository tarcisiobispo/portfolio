/**
 * Executa um comando de forma segura, evitando injeção de comandos
 * @param {string} command - O comando base a ser executado
 * @param {string[]} args - Lista de argumentos para o comando
 * @returns {string} - O comando seguro para execução
 */
export function buildSafeCommand(command, args) {
  if (!command || typeof command !== 'string') {
    throw new Error('Command must be a non-empty string');
  }
  
  if (!Array.isArray(args)) {
    throw new Error('Arguments must be an array');
  }
  
  // Lista de comandos permitidos
  const allowedCommands = ['git', 'npm', 'xcopy', 'cd'];
  
  // Verifica se o comando base é permitido
  const baseCommand = command.split(' ')[0].toLowerCase();
  if (!allowedCommands.includes(baseCommand)) {
    throw new Error(`Command not allowed: ${baseCommand}`);
  }
  
  // Escapa argumentos para evitar injeção de comandos
  const escapedArgs = args.map(arg => {
    // Remove caracteres perigosos e escapa aspas
    const cleaned = String(arg)
      .replace(/[;&|`$()\\]/g, '')
      .replace(/"/g, '\\"');
    
    // Envolve em aspas para lidar com espaços
    return `"${cleaned}"`;
  });
  
  // Retorna o comando com argumentos escapados
  return `${command} ${escapedArgs.join(' ')}`;
}