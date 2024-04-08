import sqlite from 'better-sqlite3';
import path from 'node:path';

// creates an database instance in file `database.db`
export const db = sqlite(path.join(process.cwd(), './database.db'), { verbose: console.log });

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY, 
    created_at TEXT,
    gpt_prompt TEXT, 
    user_question TEXT,
    gpt_response TEXT
  )
`,
).run();
