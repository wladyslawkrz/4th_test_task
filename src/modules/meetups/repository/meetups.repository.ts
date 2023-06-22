import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IMeetupsRepository } from './meetups.repository.interface';
import { Prisma } from '@prisma/client';
import { SortDirections } from 'src/common/enum';
import { PostMeetupDto, UpdateMeetupDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { MeetupWithPlaceAndTags } from 'src/common';

@Injectable()
export class MeetupsRepository implements IMeetupsRepository {
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

  async createMeetup(userId: number, dto: PostMeetupDto): Promise<void> {
    const meetup = await this.prisma.meetup.create({
      data: {
        meetupName: dto.meetupName,
        meetupDescription: dto.meetupDescription,
        meetingTime: new Date(dto.meetingTime),
        ...(dto.meetingPlaceId && { meetingPlaceId: dto.meetingPlaceId }),
        meetupCreatorId: userId,
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
