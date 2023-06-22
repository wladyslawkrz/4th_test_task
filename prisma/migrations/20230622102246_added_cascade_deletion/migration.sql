-- DropForeignKey
ALTER TABLE "tagsOnMeetups" DROP CONSTRAINT "tagsOnMeetups_meetupId_fkey";

-- AddForeignKey
ALTER TABLE "tagsOnMeetups" ADD CONSTRAINT "tagsOnMeetups_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "meetups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
