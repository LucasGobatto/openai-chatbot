import express from 'express';
import { DatabaseManager } from './db/db.manager.js';
import { jsonSafeParse, sendEvent } from './helpers.js';

export const router = express.Router();

router.post('/eventos', (req, res) => {
  console.log('Evento recebido:', JSON.stringify(req.body));

  // ignorando o evento
  if (req.body.tipo !== 'CONSULTA_CRIADA') {
    return res.status(200).json({ success: true });
  }

  const data = req.body.dados;

  DatabaseManager.stats.save({
    userIdentifier: data.userIdentifier,
    timeSpent: data.timeSpent,
    response: data.response,
    question: data.question,
    contextType: data.contextType,
    role: data.role,
    description: data.description,
    values: data.values,
    resume: data.resume,
    promptTokens: data.tokens.prompt,
    responseTokens: data.tokens.response,
    totalTokens: data.tokens.total,
  });

  return res.status(200).json({ success: true });
});

router.get('/stats', async (req, res) => {
  const baseLogEvent = {
    tipo: 'LOG_CRIADO',
    dados: {
      service: 'reports',
      method: 'GET',
      route: `/stats`,
      body: jsonSafeParse(req.body),
    },
  };

  try {
    const overall = DatabaseManager.stats.findOverallStats();
    const groupedByMonth = DatabaseManager.stats.findMonthAverageStats();
    const topFiveUsers = DatabaseManager.stats.findTopUsers();
    const overallConsultedDays = DatabaseManager.stats.findOverallConsultedDays();

    const topFiveGroupedByMonth = topFiveUsers.reduce((agg, curr) => {
      // coloca no máximo 5 usuários na lista
      if (agg[curr.month] && agg[curr.month].length < 5) {
        agg[curr.month].push(curr);
        agg[curr.month].sort((a, b) => b.totalTimeSpent - a.totalTimeSpent);
      } else {
        agg[curr.month] = [curr];
      }

      return agg;
    }, {});

    baseLogEvent.dados.status = 200;
    baseLogEvent.dados.message = null;
    await sendEvent(baseLogEvent);

    return res.status(200).json({
      data: {
        overall,
        groupedByMonth,
        overallConsultedDays,
        topFiveUsers: topFiveGroupedByMonth,
      },
      error: null,
    });
  } catch (error) {
    console.error(error.message);
    const errorMessage = 'Ocorreu um erro no servidor.';

    baseLogEvent.dados.status = 500;
    baseLogEvent.dados.message = errorMessage;

    await sendEvent(baseLogEvent);

    return res.send(500).json({ data: null, error: errorMessage });
  }
});
