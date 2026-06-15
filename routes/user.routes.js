import {Router} from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', (req, res) =>  getUsers);

userRouter.get('/:id', (req, res) =>  getUser);

userRouter.post('/', (req, res) =>  res.send({title: "Create new user"}));
userRouter.put('/:id', (req, res) =>  res.send({title: "Update all users"}));
userRouter.delete('/:id', (req, res) =>  res.send({title: "Fetch all users"}));

export default userRouter;  