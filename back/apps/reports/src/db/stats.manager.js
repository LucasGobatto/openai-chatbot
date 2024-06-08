import { db } from './config.js';

export class StatsManager {
  static findAll() {
    return db.prepare('SELECT * FROM stats ORDER BY id DESC').all();
  }

  static findOverallStats() {
    return db
      .prepare(
        `
        SELECT 
          MAX(total_tokens) AS maxTotalTokens, 
          MIN(total_tokens) AS minTotalTokens, 
          AVG(total_tokens) AS avgTotalTokens, 
          
          MAX(time_spent) AS maxTimeSpent,
          MIN(time_spent) AS minTimeSpent,
          AVG(time_spent) AS avgTimeSpent,
          
          MAX(response_tokens) AS maxResponseTokens, 
          MIN(response_tokens) AS minResponseTokens, 
          AVG(response_tokens) AS avgResponseTokens, 
          
          MAX(prompt_tokens) AS maxPromptTokens,
          MIN(prompt_tokens) AS minPromptTokens,
          AVG(prompt_tokens) AS avgPromptTokens
        FROM stats
      `,
      )
      .get();
  }

  static findMonthAverageStats({ month, year }) {
    return db
      .prepare(
        `
      SELECT 
        strftime('%Y-%m', created_at) AS month,
        MAX(total_tokens) AS maxTotalTokens, 
        MIN(total_tokens) AS minTotalTokens, 
        AVG(total_tokens) AS avgTotalTokens, 
        
        MAX(time_spent) AS maxTimeSpent,
        MIN(time_spent) AS minTimeSpent,
        AVG(time_spent) AS avgTimeSpent,
        
        MAX(response_tokens) AS maxResponseTokens, 
        MIN(response_tokens) AS minResponseTokens, 
        AVG(response_tokens) AS avgResponseTokens, 
        
        MAX(prompt_tokens) AS maxPromptTokens,
        MIN(prompt_tokens) AS minPromptTokens,
        AVG(prompt_tokens) AS avgPromptTokens
      FROM stats
      WHERE "month" LIKE '${year}-%${month}'
    `,
      )
      .get();
  }

  static findTopUsers({ month, year }) {
    return db
      .prepare(
        `
          SELECT
            user_identifier as "user",
            strftime('%Y-%m', created_at) AS "month",
            SUM(time_spent) as totalTimeSpent,
            COUNT(user_identifier) as totalCalls
          FROM stats
          WHERE "month" LIKE '${year}-%${month}'
          GROUP BY user_identifier, "month"
          ORDER BY "month" ASC, 
            totalTimeSpent DESC, 
            totalCalls DESC
      `,
      )
      .all();
  }

  static findOverallConsultedDays({ month, year }) {
    const topFiveMostConsultedDays = db
      .prepare(
        `
        SELECT 
          user_identifier as userIdentifier,
          total_tokens as totalTokens,
          strftime('%Y-%m', created_at) AS "month",
          created_at as createdAt
        FROM stats
        WHERE "month" LIKE '${year}-%${month}'
        ORDER BY total_tokens DESC
        LIMIT 5
        `,
      )
      .all();

    const topFiveLessConsultedDays = db
      .prepare(
        `
        SELECT 
          user_identifier as userIdentifier,
          total_tokens as totalTokens,
          strftime('%Y-%m', created_at) AS "month",
          created_at as createdAt
        FROM stats
        WHERE "month" LIKE '${year}-%${month}'
        ORDER BY total_tokens ASC
        LIMIT 5
        `,
      )
      .all();

    return [...topFiveMostConsultedDays, ...topFiveLessConsultedDays.reverse()];
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
