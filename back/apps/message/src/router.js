import express from 'express';
import { ChatGptService } from './chat-gpt.service.js';
import { DatabaseManager } from './db/db.manager.js';
import { sendEvent, validateBody, jsonSafeParse } from './helpers.js';

export const router = express.Router();

const chatGptService = new ChatGptService();

router.post('/messages/:identifier', async (req, res) => {
  const body = req.body;
  const params = req.params;

  const baseLogEvent = {
    tipo: 'LOG_CRIADO',
    dados: {
      service: 'messages',
      method: 'POST',
      route: `/messages/:identifier`,
      body: jsonSafeParse(req.body),
    },
  };

  if (!params.identifier) {
    const errorMessage = 'Identificador não informado';
    baseLogEvent.dados.status = 400;
    baseLogEvent.dados.message = errorMessage;

    await sendEvent(baseLogEvent);

    return res.status(400).json({ data: null, error: errorMessage });
  }

  const missingFields = validateBody(body);

  if (missingFields.length) {
    const errorMessage = `Campos obrigatorios não preenchidos: ${missingFields.join(', ')}`;
    baseLogEvent.dados.status = 400;
    baseLogEvent.dados.message = errorMessage;

    await sendEvent(baseLogEvent);

    return res.status(400).json({ data: null, error: errorMessage });
  }

  const validContextTypes = ['vacancy', 'resume'];

  if (!validContextTypes.includes(body.contextType)) {
    const errorMessage = `Tipo de contexto não suportado: "${
      body.contextType
    }". Tipos suportados: ${validContextTypes.join(', ')}`;
    baseLogEvent.dados.status = 400;
    baseLogEvent.dados.message = errorMessage;

    await sendEvent(baseLogEvent);

    return res.status(400).json({ data: null, error: errorMessage });
  }

  const device = DatabaseManager.devices.findByIdentifier(params.identifier);

  if (!device) {
    const errorMessage = 'Dispositivo não encontrado';
    baseLogEvent.dados.status = 404;
    baseLogEvent.dados.message = errorMessage;

    await sendEvent(baseLogEvent);

    return res.status(404).json({ data: null, error: errorMessage });
  }

  let messageId;
  try {
    const savedMessage = DatabaseManager.messages.save({
      question: body.question,
      deviceId: device.id,
    });

    messageId = savedMessage.lastInsertRowid;

    // computar o tempo da requisição
    const start = Date.now();
    const response = await chatGptService.sendMessage(body.question, body.vacancyContext, body.contextType);
    const end = Date.now();
    const timeSpent = end - start; // Milisseconds

    await sendEvent({
      tipo: 'CONSULTA_CRIADA',
      dados: {
        timeSpent,
        response,
        question: body.question,
        contextType: body.contextType,
        role: body.vacancyContext.role,
        description: body.vacancyContext.description,
        values: body.vacancyContext.values,
        resume: body.vacancyContext.resume,
      },
    });

    DatabaseManager.messages.updateResponse({
      response,
      id: messageId,
    });

    baseLogEvent.dados.status = 200;
    baseLogEvent.dados.message = null;
    await sendEvent(baseLogEvent);

    return res.status(200).json({ data: { response, question: body.question, date: new Date() }, error: null });
  } catch (error) {
    console.error(error);
    baseLogEvent.dados.status = 500;
    baseLogEvent.dados.message = error.message;

    await sendEvent(baseLogEvent);

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

router.post('/device-id', async (req, res) => {
  const baseLogEvent = {
    tipo: 'LOG_CRIADO',
    dados: {
      service: 'messages',
      route: '/device-id',
      method: 'POST',
      body: jsonSafeParse(req.body),
    },
  };

  try {
    const identifier = crypto.randomUUID();

    const deviceId = DatabaseManager.devices.save({ identifier });

    baseLogEvent.dados.status = 200;
    baseLogEvent.dados.message = null;
    await sendEvent(baseLogEvent);

    return res.status(200).json({ data: deviceId, error: null });
  } catch (error) {
    console.error(error);
    baseLogEvent.dados.status = 500;
    baseLogEvent.dados.messages = error.message;
    await sendEvent(baseLogEvent);

    return res.status(500).json({ data: null, error: 'Erro ao gerar um novo device id' });
  }
});

router.get('/messages/:identifier', async (req, res) => {
  const { identifier } = req.params;

  const baseLogEvent = {
    tipo: 'LOG_CRIADO',
    dados: {
      service: 'messages',
      method: 'GET',
      route: `/messages/:identifier`,
      body: jsonSafeParse(req.params),
    },
  };

  if (!identifier) {
    const errorMessage = 'Identificador não informado';

    baseLogEvent.dados.status = 400;
    baseLogEvent.dados.message = errorMessage;
    await sendEvent(baseLogEvent);

    return res.status(400).json({ data: null, error: errorMessage });
  }

  const device = DatabaseManager.devices.findByIdentifier(identifier);

  if (!device) {
    const errorMessage = 'Dispositivo não encontrado';

    baseLogEvent.dados.status = 404;
    baseLogEvent.dados.message = errorMessage;
    await sendEvent(baseLogEvent);

    return res.status(404).json({ data: null, error: 'Dispositivo não encontrado' });
  }

  const messages = DatabaseManager.messages.findManyByDeviceId(device.id);

  baseLogEvent.dados.status = 200;
  baseLogEvent.dados.message = null;
  await sendEvent(baseLogEvent);

  return res.status(200).json({ data: messages, error: null });
});
