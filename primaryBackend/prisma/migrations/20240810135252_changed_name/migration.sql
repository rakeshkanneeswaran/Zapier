/*
  Warnings:

  - You are about to drop the column `zapRunMetaData` on the `zapRunOutBox` table. All the data in the column will be lost.
  - You are about to drop the column `zapRunMetaData` on the `zapRuns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zapRunOutBox" DROP COLUMN "zapRunMetaData",
ADD COLUMN     "webhookMetaData" TEXT;

-- AlterTable
ALTER TABLE "zapRuns" DROP COLUMN "zapRunMetaData",
ADD COLUMN     "webhookMetaData" TEXT;
