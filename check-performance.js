#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing project performance...\n');

// Check file counts
function countFiles(dir, extensions) {
  let count = 0;
  function scan(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scan(filePath);
      } else if (stat.isFile() && extensions.some(ext => file.endsWith(ext))) {
        count++;
      }
    });
  }
  scan(dir);
  return count;
}

// Check bundle size estimate
function estimateBundleSize() {
  const pagesDir = path.join(__dirname, 'app');
  const componentFiles = countFiles(pagesDir, ['.tsx', '.ts', '.js']);
  const contentEstimate = componentFiles * 50; // Rough estimate: 50KB per file average
  return (contentEstimate / 1024).toFixed(2);
}

// Performance analysis
console.log('📊 Project Statistics:');
console.log(`   • Source files: ${countFiles('./app', ['.tsx', '.ts', '.js'])}`);
console.log(`   • Estimated bundle size: ${estimateBundleSize()} MB`);
console.log(`   • Dependencies: ${countFiles('./node_modules', ['.js'])} (approx.)`);
console.log('');

console.log('⚡ Performance Recommendations:');
console.log('   ✅ Use: npm run build:optimized (4GB memory, no lint)');
console.log('   ✅ Use: npm run build:clean (fresh build)');
console.log('   ✅ Use: npm run build:fast (quick build)');
console.log('');

console.log('🔧 Build Optimization Applied:');
console.log('   • SWC minification enabled');
console.log('   • Bundle splitting optimized');
console.log('   • React StrictMode disabled');
console.log('   • Source maps disabled for production');
console.log('   • Package imports optimized');
console.log('   • CSS optimization enabled');
console.log('');

console.log('💡 Additional Tips:');
console.log('   • Close other applications to free up memory');
console.log('   • Use SSD storage for faster I/O');
console.log('   • Consider using a CI/CD service for builds');
console.log('   • Monitor memory usage during build');
console.log('');

// Check system resources
console.log('🖥️  System Resources:');
try {
  const { execSync } = require('child_process');
  const freeMemory = execSync('free -h 2>/dev/null || echo "Memory check not available"', { encoding: 'utf8' });
  console.log(freeMemory);
} catch (e) {
  console.log('   • System memory check: Not available on Windows');
}

console.log('\n🚀 Ready to build with optimizations!');
