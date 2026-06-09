/*
  Warnings:

  - You are about to drop the column `pemission` on the `attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "pemission",
ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT false;
