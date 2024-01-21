/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallets" DROP CONSTRAINT "Wallets_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Wallets";
