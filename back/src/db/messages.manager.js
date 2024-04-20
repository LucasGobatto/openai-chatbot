import { db } from './config';

export class MessagesManager {
  static save({ question, response, deviceId }) {
    const insert = db.prepare(
      `
        INSERT INTO messages (created_at, sent_at, question, response, device_id)
        VALUES (?, ?, ?, ?, ?)
      `,
    );

    return insert.run(new Date(), new Date(), question, response || null, deviceId);
  }

  static updateResponse({ id, response }) {
    const update = db.prepare('UPDATE messages SET response = ? WHERE id = ?');

    return update.run(response, id);
  }

  static findManyByDeviceId(deviceId) {
    return db.prepare('SELECT * FROM messages WHERE device_id = ?').all(deviceId);
  }
}
