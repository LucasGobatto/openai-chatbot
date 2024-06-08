import sqlite from 'better-sqlite3';
import path from 'node:path';

// creates an database instance in file `database.db`
export const db = sqlite(path.join(process.cwd(), './logs.db'));

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY, 
      created_at TEXT,
      status INTEGER,
      route TEXT,
      method TEXT,
      service TEXT,
      input TEXT NULL,
      message TEXT NULL
    )
`,
).run();
