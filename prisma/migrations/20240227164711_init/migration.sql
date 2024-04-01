/*
  Warnings:

  - You are about to drop the column `canWorkShiftTypes` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `shiftTypeId` on the `ShiftTypeToEmployee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shiftType]` on the table `ShiftType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Made the column `shiftTypeId` on table `Shift` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `shiftType` to the `ShiftTypeToEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_canWorkShiftTypes_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeShifts" DROP CONSTRAINT "EmployeeShifts_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeShifts" DROP CONSTRAINT "EmployeeShifts_shiftId_fkey";

-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_shiftTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftTypeToEmployee" DROP CONSTRAINT "ShiftTypeToEmployee_shiftTypeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "canWorkShiftTypes",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeShifts" ALTER COLUMN "employeeId" DROP NOT NULL,
ALTER COLUMN "shiftId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "shiftTypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ShiftTypeToEmployee" DROP COLUMN "shiftTypeId",
ADD COLUMN     "shiftType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "shiftTypeToUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shiftTypeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "shiftsToUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "shiftTypeToUser_id_key" ON "shiftTypeToUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shiftsToUser_id_key" ON "shiftsToUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShiftType_shiftType_key" ON "ShiftType"("shiftType");

-- AddForeignKey
ALTER TABLE "shiftTypeToUser" ADD CONSTRAINT "shiftTypeToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shiftTypeToUser" ADD CONSTRAINT "shiftTypeToUser_shiftTypeId_fkey" FOREIGN KEY ("shiftTypeId") REFERENCES "ShiftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shiftsToUser" ADD CONSTRAINT "shiftsToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shiftsToUser" ADD CONSTRAINT "shiftsToUser_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftTypeToEmployee" ADD CONSTRAINT "ShiftTypeToEmployee_shiftType_fkey" FOREIGN KEY ("shiftType") REFERENCES "ShiftType"("shiftType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_shiftTypeId_fkey" FOREIGN KEY ("shiftTypeId") REFERENCES "ShiftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeShifts" ADD CONSTRAINT "EmployeeShifts_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeShifts" ADD CONSTRAINT "EmployeeShifts_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
