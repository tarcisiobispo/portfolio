import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const distFolder = path.join(__dirname, 'dist');
const branch = 'gh-pages';
const message = 'Deploy para GitHub Pages';

try {
  // Executar o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Agora podemos fazer o deploy com a opção --no-history para forçar a criação da branch
  console.log('\nFazendo deploy para gh-pages...');
  execSync(`npx gh-pages -d ${distFolder} -b ${branch} -m "${message}" --no-history`, { stdio: 'inherit' });

  console.log('\nDeploy concluído com sucesso!');
} catch (error) {
  console.error('\nErro durante o deploy:', error.message);
  process.exit(1);
}