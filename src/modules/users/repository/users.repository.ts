import { Prisma, User, UserOnMeetup } from '@prisma/client';
import { IUsersRepository } from './users.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from '../dto';

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

  async updateUserInfo(userId: number, dto: UpdateUserDto): Promise<any> {
    const { firstName, lastName, userRole } = dto;

    const updateData: Prisma.UserUpdateInput = {};

    if (firstName) {
      updateData.firstName = firstName;
    }

    if (lastName) {
      updateData.lastName = lastName;
    }

    if (userRole) {
      updateData.userRole = userRole;
    }

    return await this.prisma.user.update({
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
