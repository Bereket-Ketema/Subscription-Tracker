import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
  res.send("Hello world to this api");
});

app.listen(PORT, async () =>  {
  console.log(`The server is running on http://localhost:${PORT}`);
  // as soon we start our application we will call the db
  await connectToDatabase();
});

export default app;