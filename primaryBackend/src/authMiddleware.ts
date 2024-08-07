import { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const jwt_password = process.env.jwt_password;

function authMiddleware(req: Request, res: Response, next: NextFunction) {
         req.headers.authorization
}