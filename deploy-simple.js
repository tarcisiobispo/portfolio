import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // Criar pasta temporária
  const tempDir = path.join(__dirname, 'temp_deploy');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);

  // Copiar arquivos da pasta dist para a pasta temporária
  console.log('\nCopiando arquivos para pasta temporária...');
  // Usar spawn em vez de execSync com string interpolation
  const xcopyProcess = spawn('xcopy', ['/E', '/I', '/Y', 'dist\\*', tempDir], { 
    stdio: 'inherit',
    shell: true 
  });
  
  // Esperar pela conclusão do processo
  await new Promise((resolve, reject) => {
    xcopyProcess.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`xcopy process exited with code ${code}`));
    });
    xcopyProcess.on('error', reject);
  });

  // Criar arquivo .nojekyll para evitar processamento Jekyll no GitHub Pages
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

  // Inicializar git na pasta temporária
  console.log('\nInicializando git na pasta temporária...');
  // Mudar para o diretório temporário
  process.chdir(tempDir);
  
  // Inicializar git
  await execCommandSafe('git', ['init'], { stdio: 'inherit', shell: true });
  await execCommandSafe('git', ['checkout', '-b', 'gh-pages'], { stdio: 'inherit', shell: true });

  // Adicionar arquivos ao git
  console.log('\nAdicionando arquivos ao git...');
  await execCommandSafe('git', ['add', '.'], { stdio: 'inherit', shell: true });

  // Configurar usuário git temporário
  console.log('\nConfigurando usuário git temporário...');
  await execCommandSafe('git', ['config', 'user.name', 'GitHub Pages Deploy'], { stdio: 'inherit', shell: true });
  await execCommandSafe('git', ['config', 'user.email', 'deploy@example.com'], { stdio: 'inherit', shell: true });

  // Commit
  console.log('\nCriando commit...');
  await execCommandSafe('git', ['commit', '-m', 'Deploy para GitHub Pages'], { stdio: 'inherit', shell: true });

  // Adicionar remote
  console.log('\nAdicionando remote...');
  await execCommandSafe('git', ['remote', 'add', 'origin', 'https://github.com/tarcisiobispo/portfolio.git'], { stdio: 'inherit', shell: true });

  // Push forçado para a branch gh-pages
  console.log('\nEnviando para o GitHub...');
  await execCommandSafe('git', ['push', '-f', 'origin', 'gh-pages'], { stdio: 'inherit', shell: true });
  
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

// Executar a função de deploy
deploy();