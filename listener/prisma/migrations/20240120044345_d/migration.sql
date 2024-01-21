/*
  Warnings:

  - Added the required column `blockNumber` to the `Transacions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacions" ADD COLUMN     "blockNumber" INTEGER NOT NULL;
