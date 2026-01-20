#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
let pngToIco;
try { pngToIco = require('png-to-ico'); } catch (e) { pngToIco = null; }

const src = path.join(__dirname, '..', 'images', 'direitogv', 'menu_direito_final.png');
if (!fs.existsSync(src)) {
  console.error('Source not found:', src);
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
const outDir = path.join(__dirname, '..', 'backups-images', `menu_direito_final-${timestamp}`);
fs.mkdirSync(outDir, { recursive: true });

const sizes = [16, 32, 180, 192, 512];

async function makePngSizes() {
  for (const s of sizes) {
    const out = path.join(outDir, `menu_direito_final-${s}x${s}.png`);
    await sharp(src).resize(s, s, { fit: 'cover' }).png().toFile(out);
    console.log('Created', out);
  }
}

async function makeWebp() {
  const out = path.join(outDir, `menu_direito_final.webp`);
  await sharp(src).webp({ quality: 85 }).toFile(out);
  console.log('Created', out);
  for (const s of [192,512]) {
    const out2 = path.join(outDir, `menu_direito_final-${s}x${s}.webp`);
    await sharp(src).resize(s, s, { fit: 'cover' }).webp({ quality: 85 }).toFile(out2);
    console.log('Created', out2);
  }
}

async function makeIco() {
  if (!pngToIco) {
    console.warn('png-to-ico not installed — skipping .ico generation');
    return;
  }
  const pngFiles = sizes.map(s => path.join(outDir, `menu_direito_final-${s}x${s}.png`));
  try {
    const buf = await pngToIco(pngFiles);
    const out = path.join(outDir, 'favicon.ico');
    fs.writeFileSync(out, buf);
    console.log('Created', out);
  } catch (e) {
    console.error('Failed to create .ico:', e.message || e);
  }
}

(async function(){
  try {
    await makePngSizes();
    await makeWebp();
    await makeIco();
    console.log('All done. Backup directory:', outDir);
  } catch (e) {
    console.error('Error during conversion:', e.message || e);
    process.exit(1);
  }
})();
