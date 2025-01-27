import { Request, Response } from 'express';
import User, { UserMap } from '../models/user';
import database from '../database';
import jwt from "jsonwebtoken";
import { jwt_secret,node_env } from '../config';
import crypto from 'crypto';


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
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
      const { username, pass } = req.body;

      // Assuming UserMap is necessary for database setup
      UserMap(database);

      const result = await User.findOne({ where: { username } });

      if (result) {
          const hashedEnteredPassword = crypto
              .pbkdf2Sync(pass, result.dataValues.salt, 100000, 64, 'sha512')
              .toString('hex');

          if (hashedEnteredPassword === result.password) {
              const token = jwt.sign(result.dataValues, jwt_secret, { expiresIn: '1h' });

              res.cookie('news_app', token, {
                  httpOnly: true,
                  secure: node_env === 'production',
                  sameSite: 'strict',
                  maxAge: 3600000, // 1 hour
                  path: '/',
              });

              req.flash('success', 'Login successful! Welcome back.');
              res.redirect('/dashboard');
              return;
          } else {
              req.flash('error', 'Invalid email or password.');
              res.redirect('/admin/users/login');
              return;
          }
      }

      req.flash('error', 'User not found.');
      res.redirect('/admin/users/login');
  } catch (error) {
      req.flash('error', 'An unexpected error occurred. Please try again later.');
      res.redirect('/admin/users/login');
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
    return res.redirect('/admin/users/login');
  } catch (error) {
    return res.redirect('/admin/users/login');
  }
};
