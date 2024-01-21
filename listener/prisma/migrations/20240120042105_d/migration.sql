/*
  Warnings:

  - The required column `id` was added to the `Address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Transacions" (
    "id" TEXT NOT NULL,
    "Transacionshash" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transacions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transacions_Transacionshash_key" ON "Transacions"("Transacionshash");

-- CreateIndex
CREATE UNIQUE INDEX "Transacions_hash_key" ON "Transacions"("hash");
