-- CreateTable
CREATE TABLE "Scan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "openPorts" INTEGER[],
    "riskScore" INTEGER NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "scanId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
