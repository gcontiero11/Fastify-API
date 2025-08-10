/*
  Warnings:

  - You are about to alter the column `fixed` on the `Discount` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Discount" ALTER COLUMN "fixed" SET DATA TYPE INTEGER;
