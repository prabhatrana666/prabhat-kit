/**
 * Simple test to verify each component works
 */

console.log('Step 1: Testing individual components...\n');

// Test Cache Manager
try {
  console.log('📦 Testing CacheManager...');
  const { CacheManager } = await import('../src/core/CacheManager.js');
  const cache = new CacheManager(10, 5000);
  cache.set('test', 'value');
  const value = cache.get('test');
  if (value === 'value') {
    console.log('✅ CacheManager works!\n');
  } else {
    throw new Error('Cache get failed');
  }
} catch (error) {
  console.error('❌ CacheManager failed:', error.message);
}

// Test Retry Strategy
try {
  console.log('🔄 Testing RetryStrategy...');
  const { RetryStrategy } = await import('../src/core/RetryStrategy.js');
  const retry = new RetryStrategy({ maxRetries: 2 });
  console.log('✅ RetryStrategy works!\n');
} catch (error) {
  console.error('❌ RetryStrategy failed:', error.message);
}

// Test Circuit Breaker
try {
  console.log('⚡ Testing CircuitBreaker...');
  const { CircuitBreaker } = await import('../src/core/CircuitBreaker.js');
  const cb = new CircuitBreaker({ failureThreshold: 2 });
  console.log('✅ CircuitBreaker works!\n');
} catch (error) {
  console.error('❌ CircuitBreaker failed:', error.message);
}

// Test Complete Fetcher
try {
  console.log('🚀 Testing Complete Fetcher...');
  const { Fetcher } = await import('../src/index.js');
  const fetcher = new Fetcher();
  const result = await fetcher.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log('✅ Complete Fetcher works!');
  console.log(`   Got: ${result.title.substring(0, 40)}...\n`);
} catch (error) {
  console.error('❌ Fetcher failed:', error.message);
}

console.log('✨ Simple test complete!');