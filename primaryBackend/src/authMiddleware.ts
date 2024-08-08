import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwt_password } from "./config";

// Extending the Request interface to include `id`
interface AuthenticatedRequest extends Request {
    id?: string | JwtPayload;
}

function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token) // Extract token from 'Bearer <token>'
    if (!token) {
        return res.status(401).json({
            error: "You are not authenticated"
        });
    }

    try {
        const decoded = jwt.verify(token, jwt_password) as JwtPayload;
        req.body.id = decoded.id; // Assuming the payload contains `id`
        console.log("User authenticated:", decoded.id); // For debugging purposes, you might want to log the user's ID here
        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid token"
        });
    }
}

export default authMiddleware;
