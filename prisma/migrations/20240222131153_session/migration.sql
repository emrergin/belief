-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "num_of_blue_a" DROP NOT NULL,
ALTER COLUMN "num_of_blue_b" DROP NOT NULL,
ALTER COLUMN "prior" DROP DEFAULT;
