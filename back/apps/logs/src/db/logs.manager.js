import { db } from './config.js';

export class LogsManager {
  static save({ service, route, method, input, message, status }) {
    const insert = db.prepare(
      `
      INSERT INTO logs (service, route, method, input, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    );

    return insert.run(service, route, method, input, message, status, new Date().toISOString());
  }
}
