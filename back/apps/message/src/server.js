import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { router } from './router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan(':method :url :status :response-time'));

// rota apenas para o serviço de barramento não resultar em erro
app.post('/eventos', async (req, res) => {
  console.log('Evento recebido:', JSON.stringify(req.body));

  // ignorando o evento
  res.status(200).json({ success: true });
});

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Mensagem listening at http://localhost:${port}`);
});
