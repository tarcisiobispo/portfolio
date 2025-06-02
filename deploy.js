import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const distFolder = path.join(__dirname, 'dist');
const branch = 'gh-pages';
const message = 'Deploy para GitHub Pages';

// Função auxiliar para executar comandos de forma segura
async function execCommandSafe(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, options);
    
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
    // Executar o build
    console.log('Executando build...');
    await execCommandSafe('npm', ['run', 'build'], { stdio: 'inherit', shell: true });

    // Agora podemos fazer o deploy com a opção --no-history para forçar a criação da branch
    console.log('\nFazendo deploy para gh-pages...');
    await execCommandSafe('npx', [
      'gh-pages',
      '-d', distFolder,
      '-b', branch,
      '-m', message,
      '--no-history'
    ], { stdio: 'inherit', shell: true });

    console.log('\nDeploy concluído com sucesso!');
  } catch (error) {
    console.error('\nErro durante o deploy:', error.message);
    process.exit(1);
  }
}

// Executar a função de deploy
deploy();