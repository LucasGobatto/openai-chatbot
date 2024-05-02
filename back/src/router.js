import express from 'express';
import { DatabaseManager } from './db/db.manager.js';
import { ChatGptService } from './chat-gpt.service.js';

export const router = express.Router();

function jsonSafeParse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}

const chatGptService = new ChatGptService();

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

router.post('/messages/:deviceId', async (req, res) => {
  const body = req.body;
  const params = req.params;

  if (!req.params.identifier) {
    DatabaseManager.logs.save({
      route: '/messages/:identifier',
      method: 'POST',
      input: JSON.stringify(req.body),
      error: 'Identificador não informado',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'Identificador não informado' });
  }

  if (
    !body ||
    !body.question ||
    !body.vacancyContext ||
    !body.vacancyContext.role ||
    !body.vacancyContext.description ||
    !body.contextType
  ) {
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

  const device = DatabaseManager.devices.findByIdentifier(params.identifier);

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

  let messageId;
  try {
    const savedMessage = DatabaseManager.messages.save({
      question: body.question,
      deviceId: device.id,
    });

    messageId = savedMessage.lastInsertRowid;

    DatabaseManager.logs.save({
      route: '/messages',
      method: 'POST',
      input: JSON.stringify(body),
      error: null,
      status: 201,
    });

    const response = await chatGptService.sendMessage(body.question, body.vacancyContext, body.contextType);

    DatabaseManager.messages.updateResponse({
      response,
      id: messageId,
    });

    return res.status(200).json({ data: { response, question: body.question, date: new Date() }, error: null });
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
    const bealtifiedErrorMessage =
      'Ops, não consegui obter uma resposta para você. Pergunte algo diferente ou tente novamente mais tarde';

    DatabaseManager.messages.updateResponse({
      response: bealtifiedErrorMessage,
      id: messageId,
    });

    return res
      .status(200)
      .json({ data: { response: bealtifiedErrorMessage, question: body.question, date: new Date() }, error: null });
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

router.get('/messages/:identifier', (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    DatabaseManager.logs.save({
      route: '/messages/:identifier',
      method: 'GET',
      input: JSON.stringify(req.params),
      error: 'Identificador não informado',
      status: 400,
    });

    return res.status(400).json({ data: null, error: 'Identificador não informado' });
  }

  const device = DatabaseManager.devices.findByIdentifier(identifier);

  if (!device) {
    DatabaseManager.logs.save({
      route: '/messages/:identifier',
      method: 'GET',
      input: JSON.stringify(req.params),
      error: 'Dispositivo não encontrado',
      status: 404,
    });

    return res.status(404).json({ data: null, error: 'Dispositivo não encontrado' });
  }

  const messages = DatabaseManager.messages.findManyByDeviceId(device.id);

  DatabaseManager.logs.save({
    route: '/messages/:identifier',
    method: 'GET',
    input: JSON.stringify(req.params),
    error: null,
    status: 200,
  });

  return res.status(200).json({ data: messages, error: null });
});
