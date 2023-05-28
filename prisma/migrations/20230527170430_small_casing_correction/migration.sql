/*
  Warnings:

  - You are about to drop the column `preExp` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "preExp",
ADD COLUMN     "pre_exp" INTEGER;
