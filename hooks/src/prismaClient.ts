import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient({
    log: ['query']
});


// Connect to your database (replace with your own connection string)
prismaClient.$connect()

// Export the PrismaClient instance so it can be used in other modules
export default prismaClient 
