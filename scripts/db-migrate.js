#!/usr/bin/env node
// db-migrate.js — Initializes the SQLite database schema using sql.js

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'apps', 'web', 'data');
const DB_PATH = path.join(DATA_DIR, 'wallet.db');

async function migrate() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  console.log('Running database migrations...');

  const SQL = await initSqlJs();
  let db;

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS policies (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id TEXT PRIMARY KEY,
      intent_action TEXT NOT NULL,
      intent_raw TEXT NOT NULL,
      intent_amount INTEGER,
      intent_confidence REAL,
      policy_decision TEXT NOT NULL,
      policy_reason TEXT,
      adapter_name TEXT,
      result TEXT,
      is_simulated INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS strategies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      protocol TEXT NOT NULL,
      risk_level TEXT NOT NULL DEFAULT 'MEDIUM',
      enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      protocol TEXT NOT NULL,
      token TEXT NOT NULL,
      apy_bps INTEGER NOT NULL,
      tvl INTEGER NOT NULL,
      risk_level TEXT NOT NULL DEFAULT 'MEDIUM',
      fetched_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed default policies
  const policyCount = db.exec('SELECT COUNT(*) as count FROM policies');
  if (!policyCount[0] || policyCount[0].values[0][0] === 0) {
    console.log('Seeding default policies...');
    db.run("INSERT INTO policies (id, type, name, value, enabled) VALUES ('max-per-trade', 'MAX_PER_TRADE', 'Max Per Trade', '20000000', 1)");
    db.run("INSERT INTO policies (id, type, name, value, enabled) VALUES ('approval-threshold', 'APPROVAL_THRESHOLD', 'Approval Threshold', '10000000', 1)");
    db.run("INSERT INTO policies (id, type, name, value, enabled) VALUES ('strategy-whitelist', 'STRATEGY_WHITELIST', 'Strategy Whitelist', '1', 1)");
  }

  // Seed default strategies
  const strategyCount = db.exec('SELECT COUNT(*) as count FROM strategies');
  if (!strategyCount[0] || strategyCount[0].values[0][0] === 0) {
    console.log('Seeding default strategies...');
    db.run("INSERT INTO strategies (id, name, protocol, risk_level, enabled) VALUES ('fro-yield', 'Froburn Yield', 'Froburn Protocol', 'LOW', 1)");
    db.run("INSERT INTO strategies (id, name, protocol, risk_level, enabled) VALUES ('lace-pool', 'Lace Finance Pool', 'Lace Finance', 'MEDIUM', 1)");
  }

  // Persist
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);

  console.log(`Database initialized at: ${DB_PATH}`);
  db.close();
}

migrate().catch(console.error);
