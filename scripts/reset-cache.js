#!/usr/bin/env node

/**
 * Reset Vite cache script
 * 
 * This script deletes the Vite cache directory (.vite) in node_modules
 * and then starts the development server.
 */

import { rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Path to the Vite cache directory
const viteCachePath = join(rootDir, 'node_modules', '.vite');

// Check if the cache directory exists
if (existsSync(viteCachePath)) {
  console.log('🧹 Cleaning Vite cache...');
  try {
    // Delete the cache directory recursively
    rmSync(viteCachePath, { recursive: true, force: true });
    console.log('✅ Vite cache deleted successfully!');
  } catch (error) {
    console.error('❌ Error deleting Vite cache:', error);
    process.exit(1);
  }
} else {
  console.log('ℹ️ No Vite cache found. Starting with a fresh cache.');
}

// Start the development server
console.log('🚀 Starting development server...');
const viteProcess = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
  cwd: rootDir
});

viteProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Development server exited with code ${code}`);
    process.exit(code);
  }
});