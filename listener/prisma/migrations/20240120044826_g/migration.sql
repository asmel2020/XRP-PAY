/*
  Warnings:

  - You are about to drop the column `Transacionshash` on the `Transacions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transacionshash]` on the table `Transacions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transacionshash` to the `Transacions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transacions_Transacionshash_key";

-- AlterTable
ALTER TABLE "Transacions" DROP COLUMN "Transacionshash",
ADD COLUMN     "transacionshash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transacions_transacionshash_key" ON "Transacions"("transacionshash");
