/*
  Warnings:

  - Added the required column `fixed` to the `AppliedDiscount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `AppliedDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AppliedDiscount" DROP CONSTRAINT "AppliedDiscount_itemId_fkey";

-- AlterTable
ALTER TABLE "public"."AppliedDiscount" ADD COLUMN     "fixed" INTEGER NOT NULL,
ADD COLUMN     "quoteId" TEXT,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."AppliedDiscount" ADD CONSTRAINT "AppliedDiscount_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AppliedDiscount" ADD CONSTRAINT "AppliedDiscount_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
