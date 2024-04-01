/*
  Warnings:

  - You are about to drop the column `active` on the `WorkDay` table. All the data in the column will be lost.
  - Added the required column `active` to the `UserToWorkDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToWorkDay" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "WorkDay" DROP COLUMN "active";
