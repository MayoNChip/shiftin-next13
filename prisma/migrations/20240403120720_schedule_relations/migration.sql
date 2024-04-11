/*
  Warnings:

  - You are about to drop the column `userId` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_userId_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "userId",
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
