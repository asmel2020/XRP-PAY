-- AlterTable
ALTER TABLE "User" ADD COLUMN     "walletsAddress" TEXT;

-- CreateTable
CREATE TABLE "Wallets" (
    "address" TEXT NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallets_address_key" ON "Wallets"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Wallets_userId_key" ON "Wallets"("userId");

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "Wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
