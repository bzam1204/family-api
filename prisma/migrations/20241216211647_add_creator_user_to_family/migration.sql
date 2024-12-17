/*
  Warnings:

  - Added the required column `creatorUserId` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "creatorUserId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
