/*
  Warnings:

  - The `role` column on the `FamilyUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FamilyUserRole" AS ENUM ('HEAD', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "FamilyUser" DROP COLUMN "role",
ADD COLUMN     "role" "FamilyUserRole" NOT NULL DEFAULT 'MEMBER';
