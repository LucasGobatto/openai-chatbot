import express from 'express';
import { router } from './router.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :response-time'));
app.use(router);

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
