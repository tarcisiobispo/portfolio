#!/usr/bin/env node
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const sharp = require('sharp');

// Simple image optimizer: converts .jpg/.jpeg/.png to .webp
// Usage: node scripts/optimize-images.js [sourceDir] [quality]

const args = process.argv.slice(2);
const sourceDir = args[0] || path.join(__dirname, '..', 'images');
const quality = parseInt(args[1], 10) || 80;
const MAX_PARALLEL = 4; // Process 4 images at a time

function walk(dir) {
  const entries = fsSync.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function convert(file) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const [inStat, outStat] = await Promise.all([
      fs.stat(file),
      fs.stat(out).catch(() => null)
    ]);
    
    if (outStat && outStat.mtimeMs >= inStat.mtimeMs) {
      console.log('Skipping (up-to-date):', out);
      return;
    }
    await sharp(file)
      .webp({ quality })
      .toFile(out);
    console.log('Converted:', file, '->', out);
  } catch (err) {
    console.error('Failed:', file, err.message || err);
  }
}

async function processImages() {
  if (!fsSync.existsSync(sourceDir)) {
    console.error('Source directory not found:', sourceDir);
    process.exit(1);
  }

  console.log('Optimizing images in', sourceDir, 'quality=', quality);
  const files = walk(sourceDir);
  
  // Process images in parallel batches
  for (let i = 0; i < files.length; i += MAX_PARALLEL) {
    const batch = files.slice(i, i + MAX_PARALLEL);
    await Promise.all(batch.map(f => convert(f)));
  }
}

processImages();
