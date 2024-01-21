/*
  Warnings:

  - Added the required column `path` to the `Wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallets" ADD COLUMN     "path" TEXT NOT NULL;
