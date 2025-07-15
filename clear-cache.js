#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to remove directory recursively
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✅ Removed: ${dir}`);
  } else {
    console.log(`⚠️  Directory not found: ${dir}`);
  }
}

console.log('🧹 Clearing Next.js caches...');

// Remove Next.js build cache
removeDir('.next');

// Remove TypeScript build cache
removeDir('.tsbuildinfo');

// Remove node_modules/.cache
removeDir('node_modules/.cache');

// Remove Turbopack cache
removeDir('node_modules/.turbo');

console.log('✅ All caches cleared!');
console.log('🚀 Now run: npm run dev'); 