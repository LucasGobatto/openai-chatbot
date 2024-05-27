import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(':method :url :status :response-time'));

const port = process.env.PORT || 10000;

app.post('/eventos', async (req, res) => {
  console.log('Novo evento recebido:', JSON.stringify(req.body));

  // request para o micro-serviço do bff
  await axios({
    url: 'http://localhost:3000/eventos',
    method: 'post',
    data: req.body,
  });

  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Barramento listening at http://localhost:${port}`);
});
