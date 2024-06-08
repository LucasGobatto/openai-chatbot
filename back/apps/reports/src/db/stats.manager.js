import { db } from './config.js';

export class StatsManager {
  static findAll() {
    return db.prepare('SELECT * FROM stats ORDER BY id DESC').all();
  }

  static save({
    userIdentifier,
    timeSpent,
    totalTokens,
    responseTokens,
    promptTokens,
    response,
    question,
    contextType,
    role,
    description,
    values,
    resume,
  }) {
    const insert = db.prepare(
      `
      INSERT INTO stats ( 
        user_identifier,
        time_spent,
        total_tokens,
        response_tokens,
        prompt_tokens,
        response,
        question,
        context_type,
        role,
        description,
        company_values,
        resume,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    );

    return insert.run(
      userIdentifier,
      timeSpent,
      totalTokens,
      responseTokens,
      promptTokens,
      response,
      question,
      contextType,
      role,
      description,
      values,
      resume,
      new Date().toISOString(),
    );
  }
}
