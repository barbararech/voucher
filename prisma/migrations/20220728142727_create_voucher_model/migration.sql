-- CreateTable
CREATE TABLE "vouchers" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vouchers_code_key" ON "vouchers"("code");
