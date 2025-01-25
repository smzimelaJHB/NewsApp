import { Request, Response } from 'express';
import User, { UserMap } from '../models/user';
import database from '../database';
import jwt from "jsonwebtoken";
import { jwt_secret,node_env } from '../config';
import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

const iv = crypto.randomBytes(16);

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  UserMap(database);
  try {
    const result = await User.findAll();
    res.status(200).json({ users: result });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// user login
export const userLogin = async (req: Request, res: Response) => {
  UserMap(database);
  try {
    const { username, pass } = req.body;
    const result = await User.findOne({ where: { username } });
    
    if (result) {
        const hashedEnteredPassword = crypto.pbkdf2Sync(pass, result.dataValues.salt, 100000, 64, 'sha512').toString('hex');
        // Compare the newly hashed password with the stored hash
        if(hashedEnteredPassword === result.password){
          const token = jwt.sign(result.dataValues, jwt_secret, { expiresIn: '1h' });

          res.cookie("news_app", token, {
            httpOnly: true,
            secure: node_env === 'production',
            sameSite: 'strict',
            maxAge: 3600000,//1hr
            path: "/",});

          res.status(200).json({ user: result,message: 'successfully loged in'});
          return;
        }
       res.status(403).json({success: false, message: 'Invalid email or password'});
    }
   else {
       res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
  UserMap(database);
  const { name, username, pass } = req.body; // Adjust fields as per your User model

  const salt = crypto.randomBytes(16).toString('hex');
  const password = crypto.pbkdf2Sync(pass, salt, 100000, 64, 'sha512').toString('hex');

  try {
    const newUser = await User.create({ name, username, password, salt});
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};
