import mongoose from "mongoose"
import User from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

// what is a req body? -> req.body is an object containing data from the client (post request)

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();// mogoose transaction
  session.startTransaction();//for atomic db update either all or none

  try {
    //logic to create new user
    const {name, email, password} = req.body;
    
    // Check is a user already exists
    const existingUser = await User.findone({email});

    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // if user not exist Hash password for the user
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await user.create([{name, email, password: hashedPassword}], {session});

    const token = jwt.sign({userId: newUsers[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: newUsers[0],
        token,
      }
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {

}

export const signOut = async (req, res, next) => {

}