#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Simple image optimizer: converts .jpg/.jpeg/.png to .webp
// Usage: node scripts/optimize-images.js [sourceDir] [quality]

const args = process.argv.slice(2);
const sourceDir = args[0] || path.join(__dirname, '..', 'images');
const quality = parseInt(args[1], 10) || 80;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      convert(full).catch(err => console.error('Error converting', full, err));
    }
  }
}

async function convert(file) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const inStat = fs.statSync(file);
    let outStat;
    try { outStat = fs.statSync(out); } catch (e) { outStat = null; }
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

if (!fs.existsSync(sourceDir)) {
  console.error('Source directory not found:', sourceDir);
  process.exit(1);
}

console.log('Optimizing images in', sourceDir, 'quality=', quality);
walk(sourceDir);
