import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IMeetupsRepository } from './meetups.repository.interface';
import { Prisma, Meetup } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto, UpdateMeetupDto } from '../dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetupsRepository implements IMeetupsRepository {
  constructor(private prisma: PrismaService) {}

  async getAllMeetups(
    page: number,
    limit: number,
    condition: Prisma.MeetupWhereInput,
    sortDirection: SortDirections,
  ): Promise<Meetup[]> {
    const meetups = await this.prisma.meetup.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        tags: true,
      },
      where: condition,
      orderBy: {
        meetingTime: sortDirection,
      },
    });

    return meetups;
  }

  async getMeetupById(meetupId: number): Promise<Meetup> {
    const meetup = await this.prisma.meetup.findUnique({
      where: {
        id: meetupId,
      },
    });

    return meetup;
  }

  async createMeetup(dto: PostMeetupDto): Promise<void> {
    const meetup = await this.prisma.meetup.create({
      data: {
        meetupName: dto.meetupName,
        meetupDescription: dto.meetupDescription,
        meetingTime: new Date(dto.meetingTime),
        ...(dto.meetingPlaceId && { meetingPlaceId: dto.meetingPlaceId }),
      },
    });

    if (dto.tags && dto.tags.length > 0) {
      const tagIds = dto.tags;

      const tagOnMeetupData = tagIds.map((tagId) => ({
        tagId,
        meetupId: meetup.id,
      }));

      await this.prisma.tagOnMeetup.createMany({
        data: tagOnMeetupData,
      });
    }
  }

  async updateMeetup(meetupId: number, dto: UpdateMeetupDto): Promise<void> {
    const meetupData = {} as Prisma.MeetupUpdateInput;

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

    await this.prisma.meetup.updateMany({
      where: { id: meetupId },
      data: meetupData,
    });

    if (dto.tags && dto.tags.length > 0) {
      const tagIds = dto.tags;

      await this.prisma.tagOnMeetup.deleteMany({
        where: { meetupId },
      });

      const tagOnMeetupData = tagIds.map((tagId) => ({
        tagId,
        meetupId,
      }));

      await this.prisma.tagOnMeetup.createMany({
        data: tagOnMeetupData,
      });
    }
  }

  async deleteMeetup(meetupId: number): Promise<void> {
    await this.prisma.meetup.delete({
      where: { id: meetupId },
    });
  }
}
