/*
  Warnings:

  - Changed the type of `userRole` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Organizer');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userRole",
ADD COLUMN     "userRole" "Role" NOT NULL;
