/*
  Warnings:

  - Added the required column `weight` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test" ADD COLUMN     "weight" DECIMAL(2,1) NOT NULL;
