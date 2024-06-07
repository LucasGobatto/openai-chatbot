import express from 'express';
import { DatabaseManager } from './db/db.manager.js';

export const router = express.Router();

router.post('/eventos', (req, res) => {
  console.log('Evento recebido:', JSON.stringify(req.body));

  // ignorando eventos que não pertencem a esse serviço
  if (req.body.tipo !== 'LOG_CRIADO') {
    return res.status(200).send({ success: true });
  }

  const { service, route, method, input, message, status } = req.body.dados;

  DatabaseManager.logs.save({
    service,
    route,
    method,
    input,
    message,
    status,
  });

  return res.json({ success: true });
});
