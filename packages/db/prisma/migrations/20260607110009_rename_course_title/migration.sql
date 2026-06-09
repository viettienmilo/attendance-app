/*
  Warnings:

  - You are about to drop the column `tittle` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "course" DROP COLUMN "tittle",
ADD COLUMN     "title" VARCHAR(256);
