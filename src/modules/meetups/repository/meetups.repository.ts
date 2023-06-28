import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IMeetupsRepository } from './meetups.repository.interface';
import { Meetup, Prisma } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto } from '../dto';
import { Injectable, Logger } from '@nestjs/common';
import { MeetupWithPlaceAndTags } from 'src/common';

@Injectable()
export class MeetupsRepository implements IMeetupsRepository {
  logger = new Logger();
  constructor(private prisma: PrismaService) {}

  async getAllMeetups(
    page: number,
    limit: number,
    condition: Prisma.MeetupWhereInput,
    sortDirection: SortDirections,
  ): Promise<MeetupWithPlaceAndTags[]> {
    const meetups: MeetupWithPlaceAndTags[] = await this.prisma.meetup.findMany(
      {
        take: limit,
        skip: (page - 1) * limit,
        include: {
          tags: {
            include: { tag: true },
          },
          place: true,
        },
        where: condition,
        orderBy: {
          meetingTime: sortDirection,
        },
      },
    );

    return meetups;
  }

  async getUserMeetups(
    id: number,
    page: number,
    limit: number,
  ): Promise<MeetupWithPlaceAndTags[]> {
    const meetups = await this.prisma.meetup.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        users: {
          include: {
            user: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        place: true,
      },

      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
    });

    return meetups;
  }

  async getMeetupById(meetupId: number): Promise<MeetupWithPlaceAndTags> {
    const meetup = await this.prisma.meetup.findUnique({
      where: {
        id: meetupId,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        place: true,
      },
    });

    return meetup;
  }

  async createMeetup(userId: number, dto: PostMeetupDto): Promise<Meetup> {
    const meetup = await this.prisma.meetup.create({
      data: {
        meetupName: dto.meetupName,
        meetupDescription: dto.meetupDescription,
        meetingTime: new Date(dto.meetingTime),
        ...(dto.meetingPlaceId && { meetingPlaceId: dto.meetingPlaceId }),
        meetupCreatorId: userId,
      },
    });

    return meetup;
  }

  async assignTags(id: number, tagIds: number[]): Promise<Prisma.BatchPayload> {
    const tagOnMeetupData = tagIds.map((tagId) => ({
      tagId,
      meetupId: id,
    }));

    return await this.prisma.tagOnMeetup.createMany({
      data: tagOnMeetupData,
    });
  }

  async deleteTags(id: number): Promise<Prisma.BatchPayload> {
    return await this.prisma.tagOnMeetup.deleteMany({
      where: { meetupId: id },
    });
  }

  async updateMeetup(
    meetupId: number,
    meetupData: Prisma.MeetupUpdateInput,
  ): Promise<Prisma.BatchPayload> {
    const updated = await this.prisma.meetup.updateMany({
      where: { id: meetupId },
      data: meetupData,
    });

    return updated;
  }

  async deleteMeetup(meetupId: number): Promise<Prisma.BatchPayload> {
    return await this.prisma.meetup.deleteMany({
      where: { id: meetupId },
    });
  }
}
