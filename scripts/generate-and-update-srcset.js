const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const cheerio = require('cheerio');

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'images');
const WIDTHS = [320, 640, 960, 1280, 1920];

function walkDir(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      results.push(...walkDir(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

async function generateVariants(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return [];
  const dir = path.dirname(file);
  const name = path.basename(file, ext);
  const variants = [];

  try {
    const meta = await sharp(file).metadata();
    const origW = meta.width || Math.max(...WIDTHS);

    for (const w of WIDTHS) {
      if (w > origW) continue;
      const avifOut = path.join(dir, `${name}-${w}.avif`);
      const webpOut = path.join(dir, `${name}-${w}.webp`);

      if (!fs.existsSync(avifOut)) {
        await sharp(file).resize(w).avif({ quality: 60 }).toFile(avifOut);
      }
      if (!fs.existsSync(webpOut)) {
        await sharp(file).resize(w).webp({ quality: 70 }).toFile(webpOut);
      }

      variants.push({ width: w, avif: avifOut, webp: webpOut });
    }
  } catch (err) {
    console.error('Erro processando', file, err.message);
  }

  return variants;
}

function toWebPath(abs) {
  return path.relative(ROOT, abs).split(path.sep).join('/');
}

async function generateAllImages() {
  if (!fs.existsSync(IMAGES_DIR)) return;
  const files = walkDir(IMAGES_DIR);
  for (const f of files) {
    await generateVariants(f);
  }
}

function findHtmlFiles(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (d.isFile() && full.toLowerCase().endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

function buildSrcsetVariants(srcAbs) {
  const ext = path.extname(srcAbs);
  const name = path.basename(srcAbs, ext);
  const dir = path.dirname(srcAbs);
  const entriesAvif = [];
  const entriesWebp = [];
  for (const w of WIDTHS) {
    const avif = path.join(dir, `${name}-${w}.avif`);
    const webp = path.join(dir, `${name}-${w}.webp`);
    if (fs.existsSync(avif)) entriesAvif.push(`${toWebPath(avif)} ${w}w`);
    if (fs.existsSync(webp)) entriesWebp.push(`${toWebPath(webp)} ${w}w`);
  }
  return { avif: entriesAvif.join(', '), webp: entriesWebp.join(', ') };
}

function updateHtmlFiles() {
  const htmls = findHtmlFiles(ROOT);
  for (const file of htmls) {
    let changed = false;
    const raw = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(raw, { decodeEntities: false });

    $('picture').each((i, pic) => {
      const $pic = $(pic);
      const $img = $pic.find('img').first();
      if (!$img || !$img.attr('src')) return;
      const src = $img.attr('src');
      const srcAbs = path.join(ROOT, src);
      if (!fs.existsSync(srcAbs)) return;

      const sets = buildSrcsetVariants(srcAbs);
      // remove existing generated AVIF/webp sources to avoid duplicates
      $pic.find('source[data-generated="true"]').remove();

      if (sets.avif) {
        const srcAttr = sets.avif;
        $pic.prepend(`<source data-generated="true" type="image/avif" srcset="${srcAttr}">`);
        changed = true;
      }
      if (sets.webp) {
        const srcAttr = sets.webp;
        $pic.prepend(`<source data-generated="true" type="image/webp" srcset="${srcAttr}">`);
        changed = true;
      }
    });

    // also handle plain <img> not wrapped by <picture>
    $('img').each((i, img) => {
      const $img = $(img);
      if ($img.parent().is('picture')) return;
      const src = $img.attr('src');
      if (!src) return;
      const srcAbs = path.join(ROOT, src);
      if (!fs.existsSync(srcAbs)) return;

      const sets = buildSrcsetVariants(srcAbs);
      if (!sets.avif && !sets.webp) return;

      const picHtml = [];
      if (sets.avif) picHtml.push(`<source data-generated="true" type="image/avif" srcset="${sets.avif}">`);
      if (sets.webp) picHtml.push(`<source data-generated="true" type="image/webp" srcset="${sets.webp}">`);
      picHtml.push($.html($img));

      $img.replaceWith(`<picture>${picHtml.join('')}</picture>`);
      changed = true;
    });

    if (changed) {
      fs.writeFileSync(file, $.html(), 'utf8');
      console.log('Updated:', file);
    }
  }
}

(async function main(){
  console.log('Gerando variantes AVIF/WebP...');
  await generateAllImages();
  console.log('Atualizando HTMLs com srcset...');
  updateHtmlFiles();
  console.log('Pronto.');
})();
