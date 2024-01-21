-- DropForeignKey
ALTER TABLE "Wallets" DROP CONSTRAINT "Wallets_userId_fkey";

-- AlterTable
ALTER TABLE "Wallets" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "Wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
