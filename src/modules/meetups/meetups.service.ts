import { Injectable, NotFoundException } from '@nestjs/common';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import { SortDirections } from 'src/common/enum';
import { MeetupsRepository } from './repository/meetups.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetupsService {
  constructor(private meetupsRepository: MeetupsRepository) {}

  async getAllMeetups(page: number, limit: number, dto: QueryParamsDto) {
    const sortDirection = dto.sort || SortDirections.descending;

    const meetups = await this.meetupsRepository.getAllMeetups(
      page,
      limit,
      this.getWhereCondition(dto),
      sortDirection,
    );

    return { page, limit, meetups };
  }

  async getMeetupById(id: number) {
    const meetup = await this.meetupsRepository.getMeetupById(Number(id));
    if (!meetup) return new NotFoundException('This meetup was not found');

    return meetup;
  }

  async postMeetup(userId: number, dto: PostMeetupDto) {
    await this.meetupsRepository.createMeetup(userId, dto);
  }

  async updateMeetupInfo(meetupId: number, dto: UpdateMeetupDto) {
    await this.meetupsRepository.updateMeetup(Number(meetupId), dto);
  }

  async deleteMeetup(meetupId: number) {
    const meetup = await this.meetupsRepository.getMeetupById(meetupId);
    if (!meetup) return new NotFoundException('This meetup was not found');

    await this.meetupsRepository.deleteMeetup(meetupId);
  }

  private getWhereCondition(dto: QueryParamsDto): Prisma.MeetupWhereInput {
    const whereCondition: Prisma.MeetupWhereInput = {};

    if (dto.meetup) whereCondition.meetupName = { contains: dto.meetup };

    if (dto.description)
      whereCondition.meetupDescription = { contains: dto.description };

    if (dto.timefrom) {
      whereCondition.meetingTime = { gte: dto.timefrom };
    }

    if (dto.timeto) {
      if (whereCondition.meetingTime) {
        whereCondition.meetingTime['lte'] = dto.timeto;
      } else {
        whereCondition.meetingTime = { lte: dto.timeto };
      }
    }

    return whereCondition;
  }
}
