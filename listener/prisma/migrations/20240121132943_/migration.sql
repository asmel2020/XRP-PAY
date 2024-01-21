/*
  Warnings:

  - A unique constraint covering the columns `[paymentsId]` on the table `Transacions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentsId` to the `Transacions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacions" ADD COLUMN     "isHarvest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentsId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transacions_paymentsId_key" ON "Transacions"("paymentsId");

-- AddForeignKey
ALTER TABLE "Transacions" ADD CONSTRAINT "Transacions_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
