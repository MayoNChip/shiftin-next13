-- CreateTable
CREATE TABLE "UserToWorkDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workDayId" INTEGER NOT NULL,

    CONSTRAINT "UserToWorkDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToWorkDay" ADD CONSTRAINT "UserToWorkDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToWorkDay" ADD CONSTRAINT "UserToWorkDay_workDayId_fkey" FOREIGN KEY ("workDayId") REFERENCES "WorkDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
