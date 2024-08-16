#!/bin/sh

# Apply Prisma migrations


# Apply Prisma migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
npm run seed

# Start the application
npm run start
