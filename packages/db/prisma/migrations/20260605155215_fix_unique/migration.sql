/*
  Warnings:

  - The primary key for the `attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[studentId,courseId,attendDate]` on the table `attendance` will be added. If there are existing duplicate values, this will fail.
  - Made the column `attendDate` on table `attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_pk";
ALTER TABLE "attendance" 
  ADD COLUMN "id" SERIAL NOT NULL,
  ALTER COLUMN "attendDate" SET NOT NULL,
  ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_studentId_courseId_attendDate_key" ON "attendance"("studentId", "courseId", "attendDate");
