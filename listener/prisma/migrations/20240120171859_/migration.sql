/*
  Warnings:

  - You are about to drop the column `count` on the `Transacions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentsStatus" AS ENUM ('COMPLETE', 'ACTIVATED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Transacions" DROP COLUMN "count",
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "status" "PaymentsStatus" NOT NULL DEFAULT 'ACTIVATED',

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
