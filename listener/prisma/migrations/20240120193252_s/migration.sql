-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_addressId_fkey";

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
