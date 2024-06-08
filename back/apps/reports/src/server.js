import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { router } from './router.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time'));
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Logs listening at http://localhost:5000');
});
