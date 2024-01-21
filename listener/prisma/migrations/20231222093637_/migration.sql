-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockNumber" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL,

    CONSTRAINT "BlockNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lastBlockNumber" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL,
    "typeLastBlockNumber" TEXT NOT NULL DEFAULT 'MONITOR',

    CONSTRAINT "lastBlockNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lastBlockNumber_chainId_key" ON "lastBlockNumber"("chainId");
