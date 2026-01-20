#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function hasWebp(src, htmlFile) {
  // Resolve relative to HTML file
  const dir = path.dirname(htmlFile);
  const webpPath = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const full = path.resolve(dir, webpPath);
  return fs.existsSync(full);
}

function convertFile(file) {
  if (!file.endsWith('.html')) return;
  let content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });
  let changed = false;

  $('img').each((i, el) => {
    const $img = $(el);
    const src = $img.attr('src');
    if (!src) return;
    if (!/\.(jpe?g|png)$/i.test(src)) return;
    if (!hasWebp(src, file)) return;

    // preserve attributes
    const attrs = {};
    Object.keys(el.attribs || {}).forEach(k => attrs[k] = el.attribs[k]);

    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

    const picture = $('<picture></picture>');
    picture.append(`<source srcset="${webpSrc}" type="image/webp">`);
    // recreate img with same attributes
    const imgAttrs = Object.entries(attrs).map(([k,v]) => `${k}="${v}"`).join(' ');
    picture.append(`<img ${imgAttrs}>`);

    $img.replaceWith(picture);
    changed = true;
  });

  if (changed) {
    fs.writeFileSync(file, $.html(), 'utf8');
    console.log('Updated:', file);
  }
}

const root = process.cwd();
console.log('Scanning HTML files under', root);
walk(root, convertFile);
