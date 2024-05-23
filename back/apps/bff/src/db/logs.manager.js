import { db } from './config.js';

export class LogsManager {
  static save({ createdAt, route, method, input, error, status }) {
    const insert = db.prepare(
      `
      INSERT INTO logs (created_at, route, method, input, error, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    );

    return insert.run(createdAt ?? new Date().toISOString(), route, method, input, error, status);
  }

  static findAll() {
    return db.prepare('SELECT * FROM logs ORDER BY id DESC').all();
  }
}
