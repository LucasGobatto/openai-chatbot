import { db } from './config.js';

export class DatabaseManager {
  static saveLog({ gptPrompt, userQuestion, gptResponse, createdAt }) {
    const insert = db.prepare(
      `
      INSERT INTO logs (gpt_prompt, user_question, gpt_response, created_at)
      VALUES (?, ?, ?, ?)
    `,
    );

    return insert.run(gptPrompt, userQuestion, gptResponse, createdAt);
  }

  static findByCreationDate(createdAt) {
    const select = db.prepare(
      `
      SELECT * FROM logs
      WHERE created_at = ?
      LIMIT 1
    `,
    );

    return select.get(createdAt);
  }
}
