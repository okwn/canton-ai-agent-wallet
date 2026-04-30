// Smoke test setup — runs before each test file
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists before any test runs
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Use an in-memory DB path for tests so tests don't interfere with dev data
process.env.TEST_DB_PATH = path.join(dataDir, 'wallet-test.db');
