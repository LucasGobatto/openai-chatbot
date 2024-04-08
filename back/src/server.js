import express from 'express';
import { DatabaseManager } from './db/db.manager.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint para salvar um log
app.post('/question', (req, res) => {
  const body = req.body;

  if (!body || !body.userQuestion || !body.gptResponse) {
    // TODO - poderiamos melhorar a mensagem de erro para avisar qual campo é obrigatório
    return res.status(400).json({ data: null, error: 'Campos obrigatorios não preenchidos' });
  }

  const createdAt = new Date().toISOString();

  // TODO - este campo deverá ser preenchido automaticamente pelo servidor
  const gptPrompt = 'Lorem ipsum';

  try {
    DatabaseManager.saveLog({
      gptPrompt,
      userQuestion: body.userQuestion,
      gptResponse: body.gptResponse,
      createdAt,
    });

    // Retorna o log salvo no banco
    // Utiliza a data de criação pois é o campo mais único possível dentro do contexto
    const savedLog = DatabaseManager.findByCreationDate(createdAt);

    return res.status(201).json({ data: savedLog, error: null });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao salvar o log');
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
