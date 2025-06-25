// Script para copiar o arquivo _headers para a pasta de build (dist ou docs)
// Uso: node scripts/copy-headers.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Altere para 'dist' ou 'docs' conforme seu build
const BUILD_DIR = path.resolve(__dirname, '../dist');
const HEADERS_SRC = path.resolve(__dirname, '../public/_headers');
const HEADERS_DEST = path.join(BUILD_DIR, '_headers');

if (!fs.existsSync(BUILD_DIR)) {
  console.error('Diretório de build não encontrado:', BUILD_DIR);
  process.exit(1);
}

fs.copyFileSync(HEADERS_SRC, HEADERS_DEST);
console.log('Arquivo _headers copiado para', HEADERS_DEST);
