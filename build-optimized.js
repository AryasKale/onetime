#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting optimized Next.js build...');
console.log('📊 Build configuration:');
console.log('   • Memory limit: 4GB');
console.log('   • Lint disabled for faster builds');
console.log('   • Bundle optimization enabled');
console.log('');

try {
  const startTime = Date.now();

  console.log('⏳ Building application...');
  execSync('NODE_OPTIONS="--max-old-space-size=4096" npx next build --no-lint', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  const endTime = Date.now();
  const buildTime = ((endTime - startTime) / 1000).toFixed(2);

  console.log('');
  console.log('✅ Build completed successfully!');
  console.log(`⏱️  Total build time: ${buildTime}s`);
  console.log('');
  console.log('📦 Build artifacts:');
  console.log('   • .next/ - Optimized production build');
  console.log('   • Ready for deployment');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
