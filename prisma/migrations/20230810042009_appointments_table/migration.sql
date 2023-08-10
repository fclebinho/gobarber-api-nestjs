-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);
