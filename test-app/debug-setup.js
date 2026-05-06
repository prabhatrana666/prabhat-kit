/**
 * Debug script to verify file structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  './src/index.js',
  'src/core/Fetcher.js',
  'src/core/CacheManager.js',
  'src/core/RetryStrategy.js',
  'src/core/CircuitBreaker.js',
  'src/utils/Logger.js',
  'src/utils/ErrorNormalizer.js',
  'src/utils/TimeoutHandler.js',
  'src/types/constants.js'
];

console.log('\n🔧 Debugging File Structure...\n');

let allGood = true;
for (const file of requiredFiles) {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ MISSING: ${file}`);
    allGood = false;
  }
}

if (allGood) {
  console.log('\n✅ All files are in place!');
  console.log('\n📝 Next steps:');
  console.log('1. Run: node test-app/verify.js');
  console.log('2. Run: node test-app/simple-test.js');
  console.log('3. Run: npm test');
} else {
  console.log('\n❌ Some files are missing. Please create them following the structure above.');
}

console.log('');