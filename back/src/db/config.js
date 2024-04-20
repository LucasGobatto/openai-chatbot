import sqlite from 'better-sqlite3';
import path from 'node:path';

// creates an database instance in file `database.db`
export const db = sqlite(path.join(process.cwd(), './database.db'), { verbose: console.log });

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY, 
    created_at TEXT,
    status INTEGER,
    route TEXT,
    method TEXT,
    input TEXT,
    error TEXT NULL
  );

  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY,
    identifier varchar(36) UNIQUE, 
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY, 
    created_at TEXT,
    sent_at DateTime,
    question TEXT,
    response TEXT NULL,
    device_id INTEGER,
    FOREIGN KEY (device_id) REFERENCES devices(id)
  );
`,
).run();
