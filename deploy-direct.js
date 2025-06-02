import { execSync } from 'child_process';

try {
  // Executar o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Mudar para a branch gh-pages
  console.log('\nMudando para a branch gh-pages...');
  execSync('git checkout gh-pages', { stdio: 'inherit' });
  
  // Remover arquivos antigos (exceto .git)
  console.log('\nLimpando arquivos antigos...');
  execSync('git rm -rf .', { stdio: 'inherit' });
  
  // Copiar os arquivos da pasta dist
  console.log('\nCopiando arquivos novos...');
  execSync('xcopy /E /I /Y dist\\* .', { stdio: 'inherit' });
  
  // Adicionar os arquivos ao git
  console.log('\nAdicionando arquivos ao git...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit
  console.log('\nCriando commit...');
  execSync('git commit -m "Deploy manual para GitHub Pages"', { stdio: 'inherit' });
  
  // Push
  console.log('\nEnviando para o GitHub...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });
  
  // Voltar para a branch main
  console.log('\nVoltando para a branch main...');
  execSync('git checkout main', { stdio: 'inherit' });

  console.log('\nDeploy concluído com sucesso!');
} catch (error) {
  console.error('\nErro durante o deploy:', error.message);
  process.exit(1);
}