#!/usr/bin/env node

// 🧹 IMMEDIATE CLEANUP SCRIPT
// Run this script to clean up expired emails and update metrics immediately
// Usage: node scripts/cleanup-now.js

const https = require('https');
const http = require('http');

// Configuration
const CLEANUP_URL = process.env.CLEANUP_URL || 'http://localhost:3000/api/cleanup-expired';
const timeout = 30000; // 30 seconds timeout

console.log('🧹 OneTimeEmail Cleanup Script');
console.log('================================');
console.log(`Target URL: ${CLEANUP_URL}`);
console.log('');

async function runCleanup() {
  try {
    console.log('📊 Checking current status...');
    
    // First, check the status
    const statusResult = await makeRequest('GET', CLEANUP_URL);
    console.log('Current Status:', JSON.stringify(statusResult, null, 2));
    
    if (statusResult.status && statusResult.status.cleanup_needed) {
      console.log('');
      console.log(`⚠️  Found ${statusResult.status.expired_inboxes_pending_cleanup} expired inboxes that need cleanup!`);
      console.log('🧹 Running cleanup process...');
      
      // Run the cleanup
      const cleanupResult = await makeRequest('POST', CLEANUP_URL);
      
      console.log('');
      console.log('✅ Cleanup completed successfully!');
      console.log('');
      console.log('📊 CLEANUP RESULTS:');
      console.log('==================');
      console.log(`📧 Emails deleted: ${cleanupResult.results.expired_emails_deleted}`);
      console.log(`📮 Inboxes cleaned: ${cleanupResult.results.expired_inboxes_cleaned}`);
      console.log(`📊 Total emails before: ${cleanupResult.results.total_emails_before}`);
      console.log(`📊 Total emails after: ${cleanupResult.results.total_emails_after}`);
      console.log(`💾 Space saved: ${cleanupResult.cleanup_summary.space_saved}`);
      console.log('');
      console.log('🎯 CURRENT STATS:');
      console.log('================');
      console.log(`📧 Active emails: ${cleanupResult.cleanup_summary.current_active_emails}`);
      console.log(`📮 Active inboxes: ${cleanupResult.cleanup_summary.current_active_inboxes}`);
      
    } else {
      console.log('');
      console.log('✅ No cleanup needed! All inboxes are still active.');
      console.log('');
      console.log('📊 CURRENT STATS:');
      console.log('================');
      console.log(`📧 Total emails: ${statusResult.status.total_emails}`);
      console.log(`📮 Total inboxes: ${statusResult.status.total_inboxes}`);
      console.log(`📮 Active inboxes: ${statusResult.status.active_inboxes}`);
      console.log(`📮 Inactive inboxes: ${statusResult.status.inactive_inboxes}`);
    }
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('- Make sure your Next.js app is running');
    console.error('- Check that the CLEANUP_URL is correct');
    console.error('- Verify your database connection');
    console.error('- Run the database setup scripts if needed');
    process.exit(1);
  }
}

function makeRequest(method, url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OneTimeEmail-Cleanup-Script'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${result.error || 'Unknown error'}`));
          }
        } catch (err) {
          reject(new Error(`Invalid JSON response: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Request failed: ${err.message}`));
    });

    req.on('timeout', () => {
      req.abort();
      reject(new Error(`Request timeout after ${timeout}ms`));
    });

    req.end();
  });
}

// Run the cleanup
runCleanup().then(() => {
  console.log('');
  console.log('🎉 Cleanup script completed successfully!');
}).catch((error) => {
  console.error('💥 Script failed:', error.message);
  process.exit(1);
}); 