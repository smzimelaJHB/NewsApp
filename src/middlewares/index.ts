import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt_secret } from "../config";

// Extend the Express Request interface
declare global {
    namespace Express {
        interface Request {
            identity?: JwtPayload | string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req?.cookies?.['news_app'] || "";

        if (!token) {
            return res.redirect('/admin/users/login');
        }
        const decoded = await jwt.verify(token, jwt_secret);
        req.identity = decoded;

        next(); // Call the next middleware
    } catch (error) {
        return res.redirect('/error')
    }
};
