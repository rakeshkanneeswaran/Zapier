#!/bin/sh

# Apply Prisma migrations


# Apply Prisma migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Start the application
npm run start
