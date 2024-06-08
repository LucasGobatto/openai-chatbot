import express from 'express';
import { DatabaseManager } from './db/db.manager.js';

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

router.get('/stats', (req, res) => {
  const stats = DatabaseManager.stats.findAll();

  return res.status(200).json({ stats });
});
