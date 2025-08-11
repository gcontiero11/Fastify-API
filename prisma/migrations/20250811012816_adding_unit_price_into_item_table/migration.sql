/*
  Warnings:

  - Added the required column `unitPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Item" ADD COLUMN     "unitPrice" INTEGER NOT NULL;
