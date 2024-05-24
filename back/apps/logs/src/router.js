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

router.post('/eventos', (req, res) => {
  console.log('Evento recebido:', jsonSafeParse(req.body));

  res.status(200).send({ success: true });
});

router.get('/consultar', (req, res) => {
  DatabaseManager.logs.save({
    route: '/consultar',
    method: 'GET',
    input: jsonSafeParse(req.body),
    error: null,
    status: 200,
  });

  const logs = DatabaseManager.logs.findAll();

  const logsParsed = logs.map((log) => ({
    ...log,
    input: jsonSafeParse(log.input),
  }));

  return res.json({ data: logsParsed, error: null });
});
