import { Meetup, Prisma } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto, UpdateMeetupDto } from '../dto';

export interface IMeetupsRepository {
  getAllMeetups(
    page: number,
    limit: number,
    condition: Prisma.MeetupWhereInput,
    sortDirection: SortDirections,
  ): Promise<Meetup[]>;
  getMeetupById(meetupId: number): Promise<Meetup>;
  createMeetup(dto: PostMeetupDto): Promise<void>;
  updateMeetup(meetupId: number, dto: UpdateMeetupDto): Promise<void>;
  deleteMeetup(meetupId: number): Promise<void>;
}
