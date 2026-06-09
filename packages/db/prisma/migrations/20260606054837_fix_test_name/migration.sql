/*
  Warnings:

  - Made the column `name` on table `test` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "test" ALTER COLUMN "name" SET NOT NULL;
