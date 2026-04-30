#!/usr/bin/env node
// dev-check.js — Verifies local development environment setup

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHECKS = [
  { name: 'Node.js version', check: () => {
    const v = process.version;
    const major = parseInt(v.slice(1).split('.')[0], 10);
    if (major < 18) throw new Error(`Node.js 18+ required, got ${v}`);
    return v;
  }},
  { name: 'pnpm installed', check: () => {
    try {
      const v = execSync('pnpm --version', { encoding: 'utf8' }).trim();
      return `pnpm ${v}`;
    } catch {
      throw new Error('pnpm not found. Install with: npm install -g pnpm');
    }
  }},
  { name: 'Root package.json', check: () => {
    const f = path.join(__dirname, '..', 'package.json');
    if (!fs.existsSync(f)) throw new Error('Missing root package.json');
    return 'present';
  }},
  { name: 'pnpm-workspace.yaml', check: () => {
    const f = path.join(__dirname, '..', 'pnpm-workspace.yaml');
    if (!fs.existsSync(f)) throw new Error('Missing pnpm-workspace.yaml');
    return 'present';
  }},
  { name: '.env.example', check: () => {
    const f = path.join(__dirname, '..', '.env.example');
    if (!fs.existsSync(f)) throw new Error('Missing .env.example');
    return 'present';
  }},
  { name: 'apps/web/package.json', check: () => {
    const f = path.join(__dirname, '..', 'apps', 'web', 'package.json');
    if (!fs.existsSync(f)) throw new Error('Missing apps/web/package.json');
    return 'present';
  }},
  { name: 'packages/shared/package.json', check: () => {
    const f = path.join(__dirname, '..', 'packages', 'shared', 'package.json');
    if (!fs.existsSync(f)) throw new Error('Missing packages/shared/package.json');
    return 'present';
  }},
  { name: 'packages/agent-core/package.json', check: () => {
    const f = path.join(__dirname, '..', 'packages', 'agent-core', 'package.json');
    if (!fs.existsSync(f)) throw new Error('Missing packages/agent-core/package.json');
    return 'present';
  }},
  { name: 'apps/web tsconfig.json', check: () => {
    const f = path.join(__dirname, '..', 'apps', 'web', 'tsconfig.json');
    if (!fs.existsSync(f)) throw new Error('Missing apps/web/tsconfig.json');
    return 'present';
  }},
];

console.log('\n=== Canton Agent Wallet — Dev Environment Check ===\n');

let passed = 0;
let failed = 0;

for (const { name, check } of CHECKS) {
  try {
    const result = check();
    console.log(`  [PASS] ${name}: ${result}`);
    passed++;
  } catch (err) {
    console.log(`  [FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

console.log(`\n--- Results: ${passed} passed, ${failed} failed ---\n`);

if (failed > 0) {
  console.log('Run the following to set up the environment:\n');
  console.log('  npm install -g pnpm');
  console.log('  pnpm install');
  console.log('  cp .env.example .env.local');
  console.log('  pnpm run dev\n');
  process.exit(1);
} else {
  console.log('Environment check passed. Run: pnpm install && pnpm run dev\n');
  process.exit(0);
}
