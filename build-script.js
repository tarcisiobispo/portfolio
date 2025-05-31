// Simple build script to bypass Vite CLI issues
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load config from vite.config.ts
const configPath = resolve(__dirname, 'vite.config.ts');
if (!fs.existsSync(configPath)) {
  console.error('vite.config.ts not found!');
  process.exit(1);
}

async function runBuild() {
  try {
    console.log('Starting build process...');
    
    // Run build with inline config to avoid loading issues
    await build({
      configFile: configPath,
      base: '/portfolio/',
      root: __dirname,
      build: {
        outDir: 'dist',
        emptyOutDir: true,
      }
    });
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild();