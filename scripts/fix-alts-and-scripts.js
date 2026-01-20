const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = process.cwd();

function findHtmlFiles(dir) {
  const res = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const d of list) {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) res.push(...findHtmlFiles(full));
    else if (d.isFile() && full.toLowerCase().endsWith('.html')) res.push(full);
  }
  return res;
}

function humanizeFilename(src) {
  if (!src) return 'Imagem';
  const base = path.basename(src).replace(/%20/g, ' ');
  const name = base.replace(/\.[a-z0-9]+$/i, '');
  // replace separators and multiple spaces
  const cleaned = name.replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'Imagem';
  // capitalize first letter
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function fileContainsHtml(str) {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

function processFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(raw, { decodeEntities: false });
  let changed = false;

  $('img[alt]').each((i, el) => {
    const $el = $(el);
    const alt = $el.attr('alt') || '';
    if (alt.trim().toLowerCase() === 'long alternative text') {
      const src = $el.attr('src') || '';
      const newAlt = humanizeFilename(src);
      $el.attr('alt', newAlt);
      changed = true;
      console.log('Replaced alt in', file, '->', newAlt);
    }
  });

  // Fix <script> elements that contain HTML inside (move HTML out)
  $('script').each((i, el) => {
    const $el = $(el);
    const inner = $el.html();
    if (inner && fileContainsHtml(inner)) {
      // Replace the <script> with its inner HTML (remove the script wrapper)
      $el.replaceWith(inner);
      changed = true;
      console.log('Unwrapped HTML inside <script> in', file);
    }
  });

  if (changed) {
    fs.writeFileSync(file, $.html(), 'utf8');
  }
}

(function main(){
  const files = findHtmlFiles(ROOT);
  for (const f of files) processFile(f);
  console.log('Done.');
})();
