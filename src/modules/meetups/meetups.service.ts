import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import { SortDirections } from 'src/common/enum';
import { MeetupsRepository } from './repository/meetups.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetupsService {
  private logger = new Logger('MeetupsService');

  constructor(private meetupsRepository: MeetupsRepository) {}

  async getAllMeetups(page: number, limit: number, dto: QueryParamsDto) {
    try {
      const sortDirection = dto.sort || SortDirections.descending;

      const meetups = await this.meetupsRepository.getAllMeetups(
        page,
        limit,
        this.getWhereCondition(dto),
        sortDirection,
      );

      this.logger.verbose(
        `Request for a list of meetups. User got ${meetups.length} rows.`,
      );

      return { page, limit, meetups };
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async getMeetupById(id: number) {
    try {
      const meetup = await this.meetupsRepository.getMeetupById(Number(id));
      if (!meetup) return new NotFoundException('This meetup was not found');

      this.logger.verbose(`Request for meetup [id ${meetup.id}]`);

      return meetup;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async postMeetup(userId: number, dto: PostMeetupDto) {
    try {
      await this.meetupsRepository.createMeetup(userId, dto);

      this.logger.verbose(
        `User [id ${userId}] created meetup '${dto.meetupName}'`,
      );
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async updateMeetupInfo(userId, meetupId: number, dto: UpdateMeetupDto) {
    try {
      const meetup = await this.meetupsRepository.getMeetupById(meetupId);

      if (!meetup) throw new NotFoundException('This meetup was not found.');

      if (!(meetup.meetupCreatorId == userId))
        throw new ForbiddenException('This is not yours meetup!');

      await this.meetupsRepository.updateMeetup(Number(meetupId), dto);

      this.logger.verbose(`Meetup [id ${meetupId}] was updated.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async deleteMeetup(userId: number, meetupId: number) {
    try {
      const meetup = await this.meetupsRepository.getMeetupById(meetupId);
      if (!meetup) return new NotFoundException('This meetup was not found');

      if (!(meetup.meetupCreatorId == userId))
        throw new ForbiddenException('This is not yours meetup!');

      await this.meetupsRepository.deleteMeetup(meetupId);

      this.logger.verbose(`Meetup [id ${meetupId}] was deleted.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
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
