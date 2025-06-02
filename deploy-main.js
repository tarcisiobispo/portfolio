import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const distFolder = path.join(__dirname, 'dist');
const branch = 'main';  // Usando a branch main em vez de gh-pages
const message = 'Deploy para GitHub Pages na branch main';

try {
  // Executar o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Copiar os arquivos para a pasta docs (GitHub Pages pode usar esta pasta na branch main)
  console.log('\nCopiando arquivos para a pasta docs...');
  execSync('rmdir /s /q docs 2>nul || echo Pasta docs não existe, criando...', { stdio: 'inherit' });
  execSync('mkdir docs', { stdio: 'inherit' });
  execSync('xcopy /E /I /Y dist\\* docs\\', { stdio: 'inherit' });

  // Adicionar os arquivos ao git
  console.log('\nAdicionando arquivos ao git...');
  execSync('git add docs', { stdio: 'inherit' });
  
  // Commit
  console.log('\nCriando commit...');
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
  
  // Push
  console.log('\nEnviando para o GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\nDeploy concluído com sucesso!');
  console.log('\nAgora você precisa configurar o GitHub Pages para usar a pasta /docs na branch main.');
} catch (error) {
  console.error('\nErro durante o deploy:', error.message);
  process.exit(1);
}