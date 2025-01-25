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
            console.log("No token provided");
            res.sendStatus(401); // End the request-response cycle here
            return;
        }

        console.log("Token received");

        const decoded = await jwt.verify(token, jwt_secret);

        console.log("JWT verified successfully");
        req.identity = decoded;

        next(); // Call the next middleware
    } catch (error) {
        console.error("Authentication error:", error);
        res.sendStatus(401); // End the request-response cycle here
    }
};
