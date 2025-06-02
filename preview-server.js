// Simple static server for previewing the built site
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 4173;
const DIST_DIR = join(__dirname, 'dist');

// MIME type mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.map': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

// Create HTTP server
const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  try {
    // Get the file path from the URL and sanitize it
    const requestPath = req.url.split('?')[0];
    
    // Prevent path traversal attacks by normalizing and validating the path
    const normalizedPath = requestPath.replace(/^(\.\.(\/|\\|$))+/, '');
    
    // Ensure the path doesn't contain any directory traversal sequences
    if (normalizedPath.includes('../') || normalizedPath.includes('..\\')) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    let filePath = join(DIST_DIR, normalizedPath);
    
    // Ensure the path is within the DIST_DIR to prevent directory traversal
    if (!filePath.startsWith(DIST_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    // Default to index.html for root path
    if (filePath === join(DIST_DIR, '/')) {
      filePath = join(DIST_DIR, 'index.html');
    }
    
    // Get file extension
    const ext = extname(filePath);
    
    try {
      // Try to read the file
      const data = await readFile(filePath);
      
      // Set the content type based on file extension
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // Set headers
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Send the file
      res.writeHead(200);
      res.end(data);
    } catch (err) {
      // If file not found and it's a JavaScript file, serve with correct MIME type
      if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(404);
        res.end('console.error("File not found");');
        return;
      }
      
      // If file not found and it's not a static asset, serve index.html for SPA routing
      if (!ext || !['.js', '.css', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) {
        const indexData = await readFile(join(DIST_DIR, 'index.html'));
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.writeHead(200);
        res.end(indexData);
        return;
      }
      
      // For other static assets, return 404
      res.writeHead(404);
      res.end('File not found');
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Server error');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Preview server running at http://localhost:${PORT}`);
  console.log(`Serving files from ${DIST_DIR}`);
});