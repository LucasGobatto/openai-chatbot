import express from 'express';
import { DatabaseManager } from './db/db.manager.js';

export const router = express.Router();

function jsonSafeParse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}

router.get('/consultar', (req, res) => {
  DatabaseManager.log.save({
    route: '/consultar',
    method: 'GET',
    input: JSON.stringify(req.body),
    error: null,
    status: 200,
  });

  const logs = DatabaseManager.log.findAll();

  const logsParsed = logs.map((log) => ({
    ...log,
    input: jsonSafeParse(log.input),
  }));

  return res.json({ data: logsParsed, error: null });
});

// Endpoint para salvar um log
router.post('/question', (req, res) => {
  const body = req.body;

  if (!body || !body.userQuestion || !body.gptResponse) {
    // TODO - poderiamos melhorar a mensagem de erro para avisar qual campo é obrigatório
    DatabaseManager.log.save({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Campos obrigatorios não preenchidos',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'Campos obrigatorios não preenchidos' });
  }

  try {
    DatabaseManager.log.save({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: null,
      status: 201,
    });

    return res.status(201).json({ data: { response: 'Lorem ipsum' }, error: null });
  } catch (error) {
    console.error(error);
    DatabaseManager.log.save({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Erro ao salvar o log',
      status: 500,
    });
    return res.status(500).send('Erro ao salvar o log');
  }
});
