const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'images');
const BACKUP_ROOT = path.join(ROOT, 'backups-images');

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

function hasDerivedVariants(origPath) {
  const dir = path.dirname(origPath);
  const ext = path.extname(origPath);
  const base = path.basename(origPath, ext);

  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === `${base}.webp` || f === `${base}.avif`) return true;
    if (f.startsWith(`${base}-`) && (f.endsWith('.webp') || f.endsWith('.avif'))) return true;
  }
  return false;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function relativeToRoot(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

function backupAndRemove() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('No images directory found.');
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(BACKUP_ROOT, `images-backup-${timestamp}`);
  ensureDir(backupDir);

  const allFiles = walkDir(IMAGES_DIR);
  const originals = allFiles.filter(f => {
    const e = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(e) && hasDerivedVariants(f);
  });

  if (originals.length === 0) {
    console.log('Nenhum original convertido encontrado para backup/remoção.');
    return;
  }

  console.log(`Found ${originals.length} originals to backup and remove.`);
  for (const orig of originals) {
    const rel = path.relative(ROOT, orig);
    const dest = path.join(backupDir, rel);
    ensureDir(path.dirname(dest));
    fs.renameSync(orig, dest);
    console.log('Backed up:', relativeToRoot(orig), '->', relativeToRoot(dest));
  }

  console.log('Backup complete. Originals moved to', relativeToRoot(backupDir));
  console.log('Now remove the originals from git index with `git rm` (I will run it for you).');
  return originals.map(p => path.relative(ROOT, p).split(path.sep).join('/'));
}

if (require.main === module) {
  try {
    const removed = backupAndRemove();
    if (removed && removed.length) {
      console.log('Files moved. Run `git rm` on these paths or let the automation run next.');
      removed.forEach(p => console.log(p));
      // print removed files list to stdout so the caller can use it
    }
  } catch (err) {
    console.error('Erro:', err.message);
    process.exit(1);
  }
}
