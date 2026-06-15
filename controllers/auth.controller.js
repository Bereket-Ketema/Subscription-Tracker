import mongoose from "mongoose"
import User from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

// what is a req body? -> req.body is an object containing data from the client (post request)

export const signUp = async (req, res, next) => {
  
}

export const signIn = async (req, res, next) => {

}

export const signOut = async (req, res, next) => {

}