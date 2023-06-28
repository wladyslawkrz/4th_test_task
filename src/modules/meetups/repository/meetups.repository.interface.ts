import { Meetup, Prisma } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto } from '../dto';
import { MeetupWithPlaceAndTags } from 'src/common';

export interface IMeetupsRepository {
  getAllMeetups(
    page: number,
    limit: number,
    condition: Prisma.MeetupWhereInput,
    sortDirection: SortDirections,
  ): Promise<MeetupWithPlaceAndTags[]>;
  getUserMeetups(
    userId: number,
    page: number,
    limit: number,
  ): Promise<MeetupWithPlaceAndTags[]>;
  getMeetupById(meetupId: number): Promise<MeetupWithPlaceAndTags>;
  createMeetup(userId: number, dto: PostMeetupDto): Promise<Meetup>;
  updateMeetup(
    meetupId: number,
    meetupData: Prisma.MeetupUncheckedUpdateInput,
  ): Promise<Prisma.BatchPayload>;
  deleteMeetup(meetupId: number): Promise<Prisma.BatchPayload>;
  assignTags(id: number, tagIds: number[]): Promise<Prisma.BatchPayload>;
  deleteTags(id: number): Promise<Prisma.BatchPayload>;
}
