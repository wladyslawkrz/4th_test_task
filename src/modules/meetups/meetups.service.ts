import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import { SortDirections } from 'src/common/enum';
import { MeetupsRepository } from './repository/meetups.repository';
import { Meetup, Prisma } from '@prisma/client';
import { MeetupWithPlaceAndTags } from 'src/common';

@Injectable()
export class MeetupsService {
  private logger = new Logger('MeetupsService');

  constructor(private meetupsRepository: MeetupsRepository) {}

  async getAllMeetups(
    page: number,
    limit: number,
    dto: QueryParamsDto,
  ): Promise<{
    page: number;
    limit: number;
    meetups: MeetupWithPlaceAndTags[];
  }> {
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

      throw new InternalServerErrorException();
    }
  }

  async getMeetupById(id: number): Promise<MeetupWithPlaceAndTags> {
    const meetup = await this.meetupsRepository.getMeetupById(id);
    if (!meetup) throw new NotFoundException('This meetup was not found');

    this.logger.verbose(`Request for meetup [id ${meetup.id}]`);

    return meetup;
  }

  async postMeetup(userId: number, dto: PostMeetupDto): Promise<Meetup> {
    const createdMeetup = await this.meetupsRepository.createMeetup(
      userId,
      dto,
    );

    this.logger.verbose(
      `User [id ${userId}] created meetup '${dto.meetupName}'`,
    );

    if (dto.tags && dto.tags.length > 0) {
      await this.meetupsRepository.assignTags(createdMeetup.id, dto.tags);
    }

    return createdMeetup;
  }

  async updateMeetupInfo(
    userId: number,
    meetupId: number,
    dto: UpdateMeetupDto,
  ): Promise<Meetup> {
    const meetup = await this.meetupsRepository.getMeetupById(meetupId);
    if (!meetup) throw new NotFoundException('This meetup was not found.');

    if (!(meetup.meetupCreatorId == userId))
      throw new ForbiddenException('This is not your meetup!');

    const updatedMeetup = await this.meetupsRepository.updateMeetup(
      meetupId,
      this.getMeetupUpdateInput(dto),
    );

    if (dto.tags && dto.tags.length > 0) {
      await this.meetupsRepository.deleteTags(updatedMeetup.id);
      await this.meetupsRepository.assignTags(updatedMeetup.id, dto.tags);
    }

    this.logger.verbose(`Meetup [id ${meetupId}] was updated.`);

    return updatedMeetup;
  }

  async deleteMeetup(userId: number, meetupId: number): Promise<Meetup> {
    const meetup = await this.meetupsRepository.getMeetupById(meetupId);
    if (!meetup) throw new NotFoundException('This meetup was not found');

    if (!(meetup.meetupCreatorId == userId))
      throw new ForbiddenException('This is not your meetup!');

    const resultOfDeletion = await this.meetupsRepository.deleteMeetup(
      meetupId,
    );

    this.logger.verbose(`Meetup [id ${meetupId}] was deleted.`);

    return resultOfDeletion;
  }

  private getMeetupUpdateInput(dto: UpdateMeetupDto) {
    const meetupData: Prisma.MeetupUpdateInput = {};

    if (dto.meetupName) {
      meetupData.meetupName = dto.meetupName;
    }

    if (dto.meetupDescription) {
      meetupData.meetupDescription = dto.meetupDescription;
    }

    if (dto.meetingTime) {
      meetupData.meetingTime = dto.meetingTime;
    }

    if (dto.meetingPlaceId !== undefined) {
      meetupData.place = { connect: { id: dto.meetingPlaceId } };
    }

    return meetupData;
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
