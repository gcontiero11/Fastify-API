/*
  Warnings:

  - Added the required column `subtotal` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Quote" ADD COLUMN     "subtotal" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;
