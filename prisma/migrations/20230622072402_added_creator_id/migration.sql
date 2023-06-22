/*
  Warnings:

  - Added the required column `meetupCreatorId` to the `meetups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetups" ADD COLUMN     "meetupCreatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "meetups" ADD CONSTRAINT "meetups_meetupCreatorId_fkey" FOREIGN KEY ("meetupCreatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
