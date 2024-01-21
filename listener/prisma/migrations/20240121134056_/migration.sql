-- DropForeignKey
ALTER TABLE "Transacions" DROP CONSTRAINT "Transacions_paymentsId_fkey";

-- AlterTable
ALTER TABLE "Transacions" ALTER COLUMN "paymentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transacions" ADD CONSTRAINT "Transacions_paymentsId_fkey" FOREIGN KEY ("paymentsId") REFERENCES "Payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
