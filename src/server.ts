import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://coust-back-end.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(morgan('dev'));
app.use(routes)

app.listen('4000', () => console.log('O app está rodando na porta 4000!'));