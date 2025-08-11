/*
  Warnings:

  - You are about to drop the column `publicId` on the `Quote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quoteKey]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quoteKey` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Quote_publicId_key";

-- AlterTable
ALTER TABLE "public"."Quote" DROP COLUMN "publicId",
ADD COLUMN     "quoteKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteKey_key" ON "public"."Quote"("quoteKey");
