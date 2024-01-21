-- AlterTable
ALTER TABLE "Transacions" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false;
