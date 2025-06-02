import { execSync } from 'child_process';
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
  execSync(`xcopy /E /I /Y dist\\* ${tempDir}`, { stdio: 'inherit' });

  // Criar arquivo .nojekyll para evitar processamento Jekyll no GitHub Pages
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

  // Inicializar git na pasta temporária
  console.log('\nInicializando git na pasta temporária...');
  execSync(`cd ${tempDir} && git init && git checkout -b gh-pages`, { stdio: 'inherit' });

  // Adicionar arquivos ao git
  console.log('\nAdicionando arquivos ao git...');
  execSync(`cd ${tempDir} && git add .`, { stdio: 'inherit' });

  // Configurar usuário git temporário se necessário
  try {
    execSync('git config user.email', { stdio: 'pipe' });
  } catch (e) {
    console.log('\nConfigurando usuário git temporário...');
    execSync(`cd ${tempDir} && git config user.name "GitHub Pages Deploy" && git config user.email "deploy@example.com"`, { stdio: 'inherit' });
  }

  // Commit
  console.log('\nCriando commit...');
  execSync(`cd ${tempDir} && git commit -m "Deploy para GitHub Pages"`, { stdio: 'inherit' });

  // Adicionar remote
  console.log('\nAdicionando remote...');
  execSync(`cd ${tempDir} && git remote add origin https://github.com/tarcisiobispo/portfolio.git`, { stdio: 'inherit' });

  // Push forçado para a branch gh-pages
  console.log('\nEnviando para o GitHub...');
  execSync(`cd ${tempDir} && git push -f origin gh-pages`, { stdio: 'inherit' });

  // Limpar pasta temporária
  console.log('\nLimpando pasta temporária...');
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('\nDeploy concluído com sucesso!');
  console.log('Seu site estará disponível em https://tarcisiobispo.github.io/portfolio/');
} catch (error) {
  console.error('\nErro durante o deploy:', error.message);
  process.exit(1);
}