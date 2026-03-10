-- CreateTable
CREATE TABLE "VendorReport" (
    "id" SERIAL NOT NULL,
    "bulan" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "emailSubject" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorReport_pkey" PRIMARY KEY ("id")
);
