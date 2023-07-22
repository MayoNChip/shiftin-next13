/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "ShiftTypeToEmployee" (
    "id" TEXT NOT NULL,
    "shiftTypeId" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ShiftTypeToEmployee_id_key" ON "ShiftTypeToEmployee"("id");

-- AddForeignKey
ALTER TABLE "ShiftTypeToEmployee" ADD CONSTRAINT "ShiftTypeToEmployee_shiftTypeId_fkey" FOREIGN KEY ("shiftTypeId") REFERENCES "ShiftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftTypeToEmployee" ADD CONSTRAINT "ShiftTypeToEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
