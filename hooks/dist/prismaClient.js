"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient({
    log: ['query']
});
// Connect to your database (replace with your own connection string)
prismaClient.$connect();
// Export the PrismaClient instance so it can be used in other modules
exports.default = prismaClient;
