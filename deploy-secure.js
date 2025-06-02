import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateUrl } from './src/utils/validateHostname.js';
import { escapeShellArg } from './src/utils/secureCommand.js';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Valida um caminho para evitar injeção de comandos
 * @param {string} inputPath - Caminho a ser validado
 * @returns {string} - Caminho seguro
 */
function validatePath(inputPath) {
  if (!inputPath || typeof inputPath !== 'string') {
    throw new Error('Invalid path');
  }
  
  // Remover caracteres perigosos
  const safePath = inputPath.replace(/[;&|`$()\\]/g, '');
  
  // Verificar se o caminho está dentro do diretório do projeto
  const resolvedPath = path.resolve(safePath);
  const projectRoot = path.resolve(__dirname);
  
  if (!resolvedPath.startsWith(projectRoot)) {
    throw new Error('Path traversal attempt detected');
  }
  
  return safePath;
}

/**
 * Executa um comando de forma segura
 * @param {string} command - Comando a ser executado
 * @param {string[]} args - Argumentos do comando
 * @param {object} options - Opções para execução
 * @returns {Promise<void>}
 */
function execCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    // Validar comando
    const allowedCommands = ['git', 'npm', 'xcopy', 'cp'];
    if (!allowedCommands.includes(command)) {
      reject(new Error(`Command not allowed: ${command}`));
      return;
    }
    
    // Sanitizar argumentos
    const sanitizedArgs = args.map(arg => {
      if (typeof arg !== 'string') {
        return String(arg);
      }
      return arg.replace(/[;&|`$()\\]/g, '');
    });
    
    const proc = spawn(command, sanitizedArgs, { 
      ...options, 
      shell: process.platform === 'win32' // Use shell apenas no Windows quando necessário
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function deploy() {
  try {
    // Criar pasta temporária com caminho seguro
    const tempDir = validatePath(path.join(__dirname, 'temp_deploy'));
    
    // Executar o build
    console.log('Executando build...');
    await execCommand('npm', ['run', 'build'], { stdio: 'inherit' });
    
    // Limpar e criar pasta temporária
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);
    
    // Copiar arquivos da pasta dist para a pasta temporária
    console.log('\nCopiando arquivos para pasta temporária...');
    if (process.platform === 'win32') {
      await execCommand('xcopy', ['/E', '/I', '/Y', 'dist\\*', tempDir], { stdio: 'inherit' });
    } else {
      await execCommand('cp', ['-R', 'dist/.', tempDir], { stdio: 'inherit' });
    }
    
    // Criar arquivo .nojekyll para evitar processamento Jekyll no GitHub Pages
    fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');
    
    // Inicializar git na pasta temporária
    console.log('\nInicializando git na pasta temporária...');
    process.chdir(tempDir);
    await execCommand('git', ['init'], { stdio: 'inherit' });
    await execCommand('git', ['checkout', '-b', 'gh-pages'], { stdio: 'inherit' });
    
    // Adicionar arquivos ao git
    console.log('\nAdicionando arquivos ao git...');
    await execCommand('git', ['add', '.'], { stdio: 'inherit' });
    
    // Configurar usuário git temporário
    console.log('\nConfigurando usuário git temporário...');
    await execCommand('git', ['config', 'user.name', 'GitHub Pages Deploy'], { stdio: 'inherit' });
    await execCommand('git', ['config', 'user.email', 'deploy@example.com'], { stdio: 'inherit' });
    
    // Commit
    console.log('\nCriando commit...');
    await execCommand('git', ['commit', '-m', 'Deploy para GitHub Pages'], { stdio: 'inherit' });
    
    // Adicionar remote
    console.log('\nAdicionando remote...');
    const repoUrl = 'https://github.com/tarcisiobispo/portfolio.git';
    if (!validateUrl(repoUrl)) {
      throw new Error('Invalid repository URL format');
    }
    await execCommand('git', ['remote', 'add', 'origin', repoUrl], { stdio: 'inherit' });
    
    // Push forçado para a branch gh-pages
    console.log('\nEnviando para o GitHub...');
    await execCommand('git', ['push', '-f', 'origin', 'gh-pages'], { stdio: 'inherit' });
    
    // Voltar ao diretório original
    process.chdir(__dirname);
    
    // Limpar pasta temporária
    console.log('\nLimpando pasta temporária...');
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    console.log('\nDeploy concluído com sucesso!');
    console.log('Seu site estará disponível em https://tarcisiobispo.github.io/portfolio/');
  } catch (error) {
    console.error('\nErro durante o deploy:', error.message);
    process.exit(1);
  }
}

deploy();