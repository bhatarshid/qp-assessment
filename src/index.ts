import express, { Request, Response } from 'express';
import prisma from '../lib/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
