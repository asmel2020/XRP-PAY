-- CreateTable
CREATE TABLE "Address" (
    "address" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "path" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_key" ON "Address"("address");
