-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "provider" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
