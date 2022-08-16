import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const corsOptions = { credential: true, origin: process.env.URL || '*' };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')));

export default app;
