/**
 * Utilitário para execução segura de comandos
 */

import { spawn } from 'child_process';

/**
 * Lista de comandos permitidos para execução
 */
const ALLOWED_COMMANDS = new Set([
  'git',
  'npm',
  'node',
  'cp',
  'xcopy',
  'mkdir',
  'rm',
  'rmdir'
]);

/**
 * Verifica se um comando é permitido
 * @param {string} command - O comando a ser verificado
 * @returns {boolean} - Verdadeiro se o comando for permitido
 */
export function isAllowedCommand(command) {
  if (!command || typeof command !== 'string') {
    return false;
  }
  
  // Extrair o comando base (primeiro token antes de espaço ou /)
  const baseCommand = command.split(/[\s\/\\]/)[0].toLowerCase();
  return ALLOWED_COMMANDS.has(baseCommand);
}

/**
 * Escapa um argumento para uso seguro em linha de comando
 * @param {string} arg - O argumento a ser escapado
 * @returns {string} - O argumento escapado
 */
export function escapeShellArg(arg) {
  if (typeof arg !== 'string') {
    arg = String(arg);
  }
  
  // Remover caracteres perigosos
  const cleaned = arg.replace(/[;&|`$()]/g, '');
  
  // Escapar aspas e caracteres especiais
  if (process.platform === 'win32') {
    // Windows: usar aspas duplas e escapar aspas duplas internas
    return `"${cleaned.replace(/"/g, '""')}"`;
  } else {
    // Unix: usar aspas simples e escapar aspas simples internas
    return `'${cleaned.replace(/'/g, "'\\''")}'`;
  }
}

/**
 * Executa um comando de forma segura
 * @param {string} command - O comando a ser executado
 * @param {string[]} args - Lista de argumentos para o comando
 * @param {object} options - Opções para execução
 * @returns {Promise<{stdout: string, stderr: string, code: number}>} - Resultado da execução
 */
export function execSecure(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isAllowedCommand(command)) {
      reject(new Error(`Command not allowed: ${command}`));
      return;
    }
    
    // Sanitizar argumentos
    const sanitizedArgs = args.map(arg => {
      if (typeof arg !== 'string') {
        return String(arg);
      }
      
      // Remover caracteres perigosos
      return arg.replace(/[;&|`$()\\]/g, '');
    });
    
    // Usar spawn em vez de exec para maior segurança
    const proc = spawn(command, sanitizedArgs, { 
      ...options,
      shell: process.platform === 'win32' // Use shell apenas no Windows quando necessário
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    proc.on('close', (code) => {
      resolve({ stdout, stderr, code });
    });
    
    proc.on('error', (err) => {
      reject(err);
    });
  });
}