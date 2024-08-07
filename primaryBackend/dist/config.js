"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_password = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
const jwt_password = "random1234";
exports.jwt_password = jwt_password;
