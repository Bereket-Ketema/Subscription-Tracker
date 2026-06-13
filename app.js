import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send("Hello world to this api");
});

app.listen(3000, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

export default app;