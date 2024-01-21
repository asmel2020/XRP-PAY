/*
  Warnings:

  - Added the required column `value` to the `Transacions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacions" ADD COLUMN     "value" TEXT NOT NULL;
