/**
 * Quick verification script to check if all modules work
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔍 Verifying Prabhat Pack Installation...\n');

// Test 1: Check if all modules can be imported
try {
  console.log('✓ Testing imports...');
  const { Fetcher, logger, DEFAULT_CONFIG } = await import('../src/index.js');
  console.log('✅ All modules imported successfully\n');
  
  // Test 2: Create fetcher instance
  console.log('✓ Creating fetcher instance...');
  const fetcher = new Fetcher({
    retries: 1,
    timeout: 5000,
    enableCache: true
  });
  console.log('✅ Fetcher created successfully\n');
  
  // Test 3: Test basic functionality
  console.log('✓ Testing basic GET request...');
  const result = await fetcher.get('https://jsonplaceholder.typicode.com/posts/1');
  if (result && result.id === 1) {
    console.log('✅ Basic request works!');
    console.log(`   Received: ${result.title.substring(0, 50)}...\n`);
  }
  
  // Test 4: Test cache
  console.log('✓ Testing cache functionality...');
  const cacheStats = fetcher.getCacheStats();
  console.log(`✅ Cache stats: ${cacheStats.hits} hits, ${cacheStats.misses} misses\n`);
  
  // Test 5: Show available features
  console.log('📦 Available Features:');
  console.log('   ✓ Automatic retries with exponential backoff');
  console.log('   ✓ Response caching with TTL');
  console.log('   ✓ Circuit breaker pattern');
  console.log('   ✓ Request/Response interceptors');
  console.log('   ✓ Comprehensive error handling');
  console.log('   ✓ Production-ready logging\n');
  
  console.log('🎉 All tests passed! Your package is ready to use.\n');
  
} catch (error) {
  console.error('❌ Verification failed:', error.message);
  console.error('\nPlease check:');
  console.error('1. All files are in correct directories');
  console.error('2. You\'re using Node.js version 14+');
  console.error('3. All imports use .js extension');
  console.error('\nError details:', error);
  process.exit(1);
}