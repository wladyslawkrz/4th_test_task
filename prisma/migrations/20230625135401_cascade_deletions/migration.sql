-- DropForeignKey
ALTER TABLE "tagsOnMeetups" DROP CONSTRAINT "tagsOnMeetups_tagId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnMeetups" DROP CONSTRAINT "usersOnMeetups_meetupId_fkey";

-- AddForeignKey
ALTER TABLE "usersOnMeetups" ADD CONSTRAINT "usersOnMeetups_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "meetups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagsOnMeetups" ADD CONSTRAINT "tagsOnMeetups_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
