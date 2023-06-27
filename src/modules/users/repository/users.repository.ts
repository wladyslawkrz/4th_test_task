import { Prisma, User, UserOnMeetup } from '@prisma/client';
import { IUsersRepository } from './users.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async getCurrentUser(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async updateUserInfo(
    userId: number,
    updateData: Prisma.UserUpdateInput,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.user.updateMany({
      where: { id: userId },
      data: updateData,
    });
  }

  async registrateUserOnMeetup(
    userId: number,
    meetupId: number,
  ): Promise<UserOnMeetup> {
    return await this.prisma.userOnMeetup.create({
      data: {
        userId: userId,
        meetupId: meetupId,
      },
    });
  }
}
