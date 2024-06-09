import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(':method :url :status :response-time'));

const port = process.env.PORT || 10000;

app.post('/eventos', async (req, res) => {
  try {
    console.log('Novo evento recebido:', JSON.stringify(req.body));

    // request para o micro-serviço de mensagens
    axios({ url: 'http://localhost:3000/eventos', method: 'post', data: req.body });
    // request para o micro-serviço de logs
    axios({ url: 'http://localhost:4000/eventos', method: 'post', data: req.body });
    // request para o micro-serviço de relatório estatístico
    axios({ url: 'http://localhost:5000/eventos', method: 'post', data: req.body });
  } catch (error) {
    console.error(error.message);
  }

  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Barramento listening at http://localhost:${port}`);
});
