import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
const jwt_password = "random1234"
export { prismaClient , jwt_password }


