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
  DatabaseManager.logs.save({
    route: '/consultar',
    method: 'GET',
    input: JSON.stringify(req.body),
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

router.post('/messages', (req, res) => {
  const body = req.body;

  if (!body || !body.question || !body.deviceId) {
    // TODO - poderiamos melhorar a mensagem de erro para avisar qual campo é obrigatório
    DatabaseManager.logs.save({
      route: '/messages',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Campos obrigatorios não preenchidos',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'Campos obrigatorios não preenchidos' });
  }

  const device = DatabaseManager.devices.findByIdentifier(body.deviceId);

  if (!device) {
    DatabaseManager.logs.save({
      route: '/messages',
      method: 'POST',
      input: JSON.stringify(body),
      error: 'Device não encontrado',
      status: 404,
    });

    return res.status(404).json({ data: null, error: 'Dispositivo não encontrado' });
  }

  try {
    const { lastInsertRowid: messageId } = DatabaseManager.messages.save({
      question: body.question,
      deviceId: device.id,
    });

    DatabaseManager.logs.save({
      route: '/messages',
      method: 'POST',
      input: JSON.stringify(body),
      error: null,
      status: 201,
    });

    // TODO - change this to a real GPT call
    const mockedResponse = 'O sistema ainda não foi integrado com a IA';

    DatabaseManager.messages.updateResponse({
      response: mockedResponse,
      id: messageId,
    });

    return res
      .status(200)
      .json({ data: { response: mockedResponse, question: body.question, date: new Date() }, error: null });
  } catch (error) {
    console.error(error);
    DatabaseManager.logs.save({
      route: '/messages',
      method: 'POST',
      input: JSON.stringify(body),
      error: error.message,
      status: 500,
    });

    // The idea here is to return a friendly message to the user
    // simulating a real GPT message
    const bealtifiedErrorMessage = 'Ops, não consegui obter uma resposta para você. Tente novamente mais tarde';
    return res.status(200).json({ data: bealtifiedErrorMessage, error: null });
  }
});

router.post('/device-id', (_req, res) => {
  try {
    const identifier = crypto.randomUUID();

    const deviceId = DatabaseManager.devices.save({ identifier });
    DatabaseManager.logs.save({
      route: '/device-id',
      method: 'POST',
      input: null,
      error: null,
      status: 200,
    });

    return res.status(200).json({ data: deviceId, error: null });
  } catch (error) {
    console.error(error);
    DatabaseManager.logs.save({
      route: '/device-id',
      method: 'POST',
      input: null,
      error: error.message,
      status: 500,
    });
    return res.status(500).json({ data: null, error: 'Erro ao gerar um novo device id' });
  }
});

router.get('/messages/:deviceId', (req, res) => {
  const { deviceId } = req.params;

  if (!deviceId) {
    DatabaseManager.logs.save({
      route: '/messages/:deviceId',
      method: 'GET',
      input: JSON.stringify(req.params),
      error: 'DeviceId não informado',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'DeviceId não informado' });
  }

  const device = DatabaseManager.devices.findByIdentifier(deviceId);

  if (!device) {
    DatabaseManager.logs.save({
      route: '/messages/:deviceId',
      method: 'GET',
      input: JSON.stringify(req.params),
      error: 'Device não encontrado',
      status: 404,
    });

    return res.status(404).json({ data: null, error: 'Dispositivo não encontrado' });
  }

  const messages = DatabaseManager.messages.findManyByDeviceId(device.id);

  DatabaseManager.logs.save({
    route: '/messages/:deviceId',
    method: 'GET',
    input: JSON.stringify(req.params),
    error: null,
    status: 200,
  });

  return res.status(200).json({ data: messages, error: null });
});
