const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const sharp = require('sharp');
const cheerio = require('cheerio');

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'images');
const WIDTHS = [320, 640, 960, 1280, 1920];
const MAX_PARALLEL = 4; // Limit concurrent image processing

function walkDir(dir) {
  const results = [];
  const list = fsSync.readdirSync(dir, { withFileTypes: true });
  list.forEach((d) => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      results.push(...walkDir(full));
    } else if (/\.(jpe?g|png)$/i.test(d.name)) {
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

      // Check if files exist and are newer than source - simplified stat calls
      const [avifStat, webpStat, sourceStat] = await Promise.all([
        fs.stat(avifOut).catch(() => null),
        fs.stat(webpOut).catch(() => null),
        fs.stat(file)
      ]);

      const tasks = [];
      
      if (!avifStat || avifStat.mtimeMs < sourceStat.mtimeMs) {
        tasks.push(sharp(file).resize(w).avif({ quality: 60 }).toFile(avifOut));
      }
      if (!webpStat || webpStat.mtimeMs < sourceStat.mtimeMs) {
        tasks.push(sharp(file).resize(w).webp({ quality: 70 }).toFile(webpOut));
      }

      if (tasks.length > 0) {
        await Promise.all(tasks);
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
  if (!fsSync.existsSync(IMAGES_DIR)) return;
  const files = walkDir(IMAGES_DIR);
  
  // Process images in parallel with concurrency limit
  for (let i = 0; i < files.length; i += MAX_PARALLEL) {
    const batch = files.slice(i, i + MAX_PARALLEL);
    await Promise.all(batch.map(f => generateVariants(f)));
  }
}

function findHtmlFiles(dir) {
  const results = [];
  const list = fsSync.readdirSync(dir, { withFileTypes: true });
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
    if (fsSync.existsSync(avif)) entriesAvif.push(`${toWebPath(avif)} ${w}w`);
    if (fsSync.existsSync(webp)) entriesWebp.push(`${toWebPath(webp)} ${w}w`);
  }
  return { avif: entriesAvif.join(', '), webp: entriesWebp.join(', ') };
}

function chooseBestSrc(srcAbs, htmlFile) {
  const ext = path.extname(srcAbs);
  const name = path.basename(srcAbs, ext);
  const dir = path.dirname(srcAbs);

  // Prefer a base .webp or .avif if present
  const baseWebp = path.join(dir, `${name}.webp`);
  const baseAvif = path.join(dir, `${name}.avif`);
  if (fsSync.existsSync(baseWebp)) {
    const rel = path.relative(path.dirname(htmlFile), baseWebp).split(path.sep).join('/');
    return rel;
  }
  if (fsSync.existsSync(baseAvif)) {
    const rel = path.relative(path.dirname(htmlFile), baseAvif).split(path.sep).join('/');
    return rel;
  }

  // Otherwise pick the largest generated variant available
  for (let i = WIDTHS.length - 1; i >= 0; i--) {
    const w = WIDTHS[i];
    const webp = path.join(dir, `${name}-${w}.webp`);
    const avif = path.join(dir, `${name}-${w}.avif`);
    if (fsSync.existsSync(webp)) return path.relative(path.dirname(htmlFile), webp).split(path.sep).join('/');
    if (fsSync.existsSync(avif)) return path.relative(path.dirname(htmlFile), avif).split(path.sep).join('/');
  }

  return null;
}

async function updateHtmlFiles() {
  const htmls = findHtmlFiles(ROOT);
  
  // Process HTML files in parallel
  await Promise.all(htmls.map(async (file) => {
    let changed = false;
    const raw = await fs.readFile(file, 'utf8');
    const $ = cheerio.load(raw, { decodeEntities: false });

    $('picture').each((i, pic) => {
      const $pic = $(pic);
      const $img = $pic.find('img').first();
      if (!$img || !$img.attr('src')) return;
      const src = $img.attr('src');
      const srcAbs = path.resolve(path.dirname(file), src);
      if (!fsSync.existsSync(srcAbs)) return;

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

      // ensure the <img> src points to an existing image (webp/avif/variant)
      const best = chooseBestSrc(srcAbs, file);
      if (best) {
        const cur = $img.attr('src') || '';
        if (cur !== best) {
          $img.attr('src', best);
          changed = true;
        }
      }
    });

    // also handle plain <img> not wrapped by <picture>
    $('img').each((i, img) => {
      const $img = $(img);
      if ($img.parent().is('picture')) return;
      const src = $img.attr('src');
      if (!src) return;
      const srcAbs = path.resolve(path.dirname(file), src);
      if (!fsSync.existsSync(srcAbs)) return;

      const sets = buildSrcsetVariants(srcAbs);
      if (!sets.avif && !sets.webp) return;

      // adjust the img src to a valid replacement before wrapping
      const best = chooseBestSrc(srcAbs, file);
      if (best) {
        $img.attr('src', best);
      }

      const picHtml = [];
      if (sets.avif) picHtml.push(`<source data-generated="true" type="image/avif" srcset="${sets.avif}">`);
      if (sets.webp) picHtml.push(`<source data-generated="true" type="image/webp" srcset="${sets.webp}">`);
      picHtml.push($.html($img));

      $img.replaceWith(`<picture>${picHtml.join('')}</picture>`);
      changed = true;
    });

    if (changed) {
      await fs.writeFile(file, $.html(), 'utf8');
      console.log('Updated:', file);
    }
  }));
}

(async function main(){
  console.log('Gerando variantes AVIF/WebP...');
  await generateAllImages();
  console.log('Atualizando HTMLs com srcset...');
  await updateHtmlFiles();
  console.log('Pronto.');
})();
