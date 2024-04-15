import express from 'express';
import { DatabaseManager } from './db/db.manager.js';

const app = express();
app.use(express.json());

app.get('/consultar', (req, res) => {
  DatabaseManager.saveLog({
    route: '/consultar',
    method: 'GET',
    input: JSON.stringify(req.body),
    error: null,
    status: 200,
  });

  const logs = DatabaseManager.findAllLogs();

  const logsParsed = logs.map((log) => ({
    ...log,
    input: jsonSafeParse(log.input),
  }));

  return res.json({ data: logsParsed, error: null });
});

function jsonSafeParse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}

// Endpoint para salvar um log
app.post('/question', (req, res) => {
  const body = req.body;

  if (!body || !body.userQuestion || !body.gptResponse) {
    // TODO - poderiamos melhorar a mensagem de erro para avisar qual campo é obrigatório
    DatabaseManager.saveLog({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Campos obrigatorios não preenchidos',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'Campos obrigatorios não preenchidos' });
  }

  try {
    DatabaseManager.saveLog({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: null,
      status: 201,
    });

    return res.status(201).json({ data: { response: 'Lorem ipsum' }, error: null });
  } catch (error) {
    console.error(error);
    DatabaseManager.saveLog({
      route: '/question',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Erro ao salvar o log',
      status: 500,
    });
    return res.status(500).send('Erro ao salvar o log');
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
