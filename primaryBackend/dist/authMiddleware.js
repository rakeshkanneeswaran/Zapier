"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization; // Extract token from 'Bearer <token>'
    if (!token) {
        return res.status(401).json({
            error: "You are not authenticated"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwt_password);
        req.id = decoded.id; // Assuming the payload contains `id`
        next();
    }
    catch (error) {
        return res.status(403).json({
            error: "Invalid token"
        });
    }
}
exports.default = authMiddleware;
