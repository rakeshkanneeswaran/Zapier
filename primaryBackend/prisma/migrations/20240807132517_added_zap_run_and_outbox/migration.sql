-- CreateTable
CREATE TABLE "zapRuns" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "zapRuns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zapRunOutBox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "zapRunOutBox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zapRuns" ADD CONSTRAINT "zapRuns_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zapRunOutBox" ADD CONSTRAINT "zapRunOutBox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "zapRuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
