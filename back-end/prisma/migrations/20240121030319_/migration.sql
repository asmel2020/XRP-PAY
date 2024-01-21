/*
  Warnings:

  - You are about to drop the column `count` on the `Transacions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentsStatus" AS ENUM ('COMPLETE', 'ACTIVATED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Transacions" DROP COLUMN "count",
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "amount" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "iswithdrawal" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "status" "PaymentsStatus" NOT NULL DEFAULT 'ACTIVATED',
    "value" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "userId" TEXT,
    "addressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockNumber" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL,

    CONSTRAINT "BlockNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lastBlockNumber" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL,
    "typeLastBlockNumber" TEXT NOT NULL DEFAULT 'MONITOR',

    CONSTRAINT "lastBlockNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lastBlockNumber_chainId_key" ON "lastBlockNumber"("chainId");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
