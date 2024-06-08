import sqlite from 'better-sqlite3';
import path from 'node:path';

// creates an database instance in file `database.db`
export const db = sqlite(path.join(process.cwd(), './reports.db'));

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY, 
      created_at TEXT,
      user_identifier TEXT NOT NULL,
      time_spent INTEGER NOT NULL,
      total_tokens INTEGER NOT NULL,
      response_tokens INTEGER NOT NULL,
      prompt_tokens INTEGER NOT NULL,
      response TEXT NOT NULL,
      question TEXT NOT NULL, 
      context_type TEXT NOT NULL,
      role TEXT NOT NULL,
      description TEXT,
      company_values TEXT,
      resume TEXT
    )
`,
).run();
