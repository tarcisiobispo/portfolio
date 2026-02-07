const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function usage() {
  console.log('Usage: node scripts/make-base-variants.js <image> [formats]');
  console.log('formats: comma-separated list of webp,avif (default: webp,avif)');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) return usage();
  const src = args[0];
  const formats = (args[1] || 'webp,avif').split(',').map(s => s.trim().toLowerCase());
  if (!fs.existsSync(src)) {
    console.error('File not found:', src);
    process.exit(1);
  }

  const dir = path.dirname(src);
  const name = path.basename(src, path.extname(src));

  try {
    if (formats.includes('webp')) {
      const out = path.join(dir, `${name}.webp`);
      if (!fs.existsSync(out)) {
        await sharp(src).webp({ quality: 80 }).toFile(out);
        console.log('Created', out);
      } else {
        console.log('Already exists:', out);
      }
    }

    if (formats.includes('avif')) {
      const out = path.join(dir, `${name}.avif`);
      if (!fs.existsSync(out)) {
        await sharp(src).avif({ quality: 60 }).toFile(out);
        console.log('Created', out);
      } else {
        console.log('Already exists:', out);
      }
    }
  } catch (err) {
    console.error('Error generating variants:', err.message);
    process.exit(1);
  }
}

main();
