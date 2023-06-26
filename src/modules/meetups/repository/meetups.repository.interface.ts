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
  getMeetupById(meetupId: number): Promise<MeetupWithPlaceAndTags>;
  createMeetup(userId: number, dto: PostMeetupDto): Promise<Meetup>;
  updateMeetup(
    meetupId: number,
    meetupData: Prisma.MeetupUpdateInput,
  ): Promise<void>;
  deleteMeetup(meetupId: number): Promise<Meetup>;
  assignTags(id: number, tagIds: number[]): Promise<void>;
  deleteTags(id: number): Promise<void>;
}
