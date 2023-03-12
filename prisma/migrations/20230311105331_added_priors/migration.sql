-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "prior" INTEGER[] DEFAULT ARRAY[3, 3]::INTEGER[];
