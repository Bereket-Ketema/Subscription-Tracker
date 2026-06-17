import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.route.js';


const app = express();

//middleware
app.use(express.json());//able to handle json data send in request or api calls
app.use(express.urlencoded({extended: false}));// to process the form data sent by html forms in a simple format
app.use(cookieParser());// read cookies form incoming request able app to store user data
app.use(arcjetMiddleware);


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);// we have created our own error cases

app.get('/', (req, res) => {
  res.send("Hello world to this api");
});

app.listen(PORT, async () =>  {
  console.log(`The server is running on http://localhost:${PORT}`);
  // as soon we start our application we will call the db
  await connectToDatabase();
});

export default app;