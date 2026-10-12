#!/usr/bin/env node
/**
 * AXL_OS XP — Automated Redesign Verification Suite
 * Executes pure TypeScript/JavaScript behavior, parity, and lifecycle tests
 * without requiring external test runner dependencies.
 */

import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const testSuites = [
  'tests/portfolio-parity.test.mjs',
  'tests/window-manager.test.mjs'
];

console.log('====================================================');
console.log('   AXL_OS XP — Verification Suite (Node Native)    ');
console.log('====================================================\n');

let totalPassed = 0;
let totalFailed = 0;

for (const suite of testSuites) {
  const suitePath = resolve(process.cwd(), suite);
  console.log(`Running test suite: ${suite}...`);

  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--test', suitePath],
    { stdio: 'inherit', env: process.env }
  );

  if (result.status === 0) {
    console.log(`  ✓ ${suite}: PASSED\n`);
    totalPassed++;
  } else {
    console.error(`  ✗ ${suite}: FAILED (exit code: ${result.status})\n`);
    totalFailed++;
  }
}

console.log('====================================================');
console.log(`Suites Passed: ${totalPassed} / ${testSuites.length}`);
console.log(`Suites Failed: ${totalFailed}`);
console.log('====================================================');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('\nAll test suites passed successfully!\n');
  process.exit(0);
}
