import { db } from './config.js';

export class DatabaseManager {
  static saveLog({ createdAt, route, method, input, error, status }) {
    const insert = db.prepare(
      `
      INSERT INTO logs (created_at, route, method, input, error, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    );

    return insert.run(createdAt ?? new Date().toISOString(), route, method, input, error, status);
  }

  static findAllLogs() {
    return db.prepare('SELECT * FROM logs ORDER BY id DESC').all();
  }
}
