/*
  Warnings:

  - Added the required column `concepto` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "concepto" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "value" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
