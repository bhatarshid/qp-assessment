import prisma from '../lib/db.ts';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/index.ts';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json({limit:'25mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router());

app.listen(PORT, async () => {
  console.log("App is litening on port: ", PORT);
});