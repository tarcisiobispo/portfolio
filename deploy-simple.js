import { execSync, execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Executar o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Criar pasta temporária
  const tempDir = path.join(__dirname, 'temp_deploy');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);

  // Copiar arquivos da pasta dist para a pasta temporária
  console.log('\nCopiando arquivos para pasta temporária...');
  // Use path.join for safe path construction
  const distPath = path.join(__dirname, 'dist');
  
  // Use fs methods for copying instead of shell commands
  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    if (!exists) return;
    
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  // Copy files using Node.js native methods
  copyRecursiveSync(distPath, tempDir);

  // Criar arquivo .nojekyll para evitar processamento Jekyll no GitHub Pages
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

  // Inicializar git na pasta temporária
  console.log('\nInicializando git na pasta temporária...');
  // Use separate commands with proper directory context
  execSync('git init', { stdio: 'inherit', cwd: tempDir });
  execSync('git checkout -b gh-pages', { stdio: 'inherit', cwd: tempDir });

  // Adicionar arquivos ao git
  console.log('\nAdicionando arquivos ao git...');
  execSync('git add .', { stdio: 'inherit', cwd: tempDir });

  // Configurar usuário git temporário se necessário
  try {
    execSync('git config user.email', { stdio: 'pipe' });
  } catch (e) {
    console.log('\nConfigurando usuário git temporário...');
    execSync('git config user.name "GitHub Pages Deploy"', { stdio: 'inherit', cwd: tempDir });
    execSync('git config user.email "deploy@example.com"', { stdio: 'inherit', cwd: tempDir });
  }

  // Commit
  console.log('\nCriando commit...');
  execSync('git commit -m "Deploy para GitHub Pages"', { stdio: 'inherit', cwd: tempDir });

  // Adicionar remote
  console.log('\nAdicionando remote...');
  execSync('git remote add origin https://github.com/tarcisiobispo/portfolio.git', { stdio: 'inherit', cwd: tempDir });

  // Push forçado para a branch gh-pages
  console.log('\nEnviando para o GitHub...');
  execSync('git push -f origin gh-pages', { stdio: 'inherit', cwd: tempDir });

  // Limpar pasta temporária
  console.log('\nLimpando pasta temporária...');
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('\nDeploy concluído com sucesso!');
  console.log('Seu site estará disponível em https://tarcisiobispo.github.io/portfolio/');
} catch (error) {
  console.error('\nErro durante o deploy:', error.message);
  process.exit(1);
}