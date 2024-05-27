import { db } from './config.js';

export class DevicesManager {
  static save({ identifier }) {
    const insert = db.prepare('INSERT INTO devices (identifier, created_at) VALUES (?, ?)');

    insert.run(identifier, new Date().toISOString());

    return identifier;
  }

  static findByIdentifier(identifier) {
    return db.prepare('SELECT * FROM devices WHERE identifier = ?').get(identifier);
  }
}
