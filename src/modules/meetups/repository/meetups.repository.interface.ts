import { Prisma } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto, UpdateMeetupDto } from '../dto';
import { MeetupWithPlaceAndTags } from 'src/common';

export interface IMeetupsRepository {
  getAllMeetups(
    page: number,
    limit: number,
    condition: Prisma.MeetupWhereInput,
    sortDirection: SortDirections,
  ): Promise<MeetupWithPlaceAndTags[]>;
  getMeetupById(meetupId: number): Promise<MeetupWithPlaceAndTags>;
  createMeetup(userId: number, dto: PostMeetupDto): Promise<void>;
  updateMeetup(meetupId: number, dto: UpdateMeetupDto): Promise<void>;
  deleteMeetup(meetupId: number): Promise<void>;
}
