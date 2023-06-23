import { Prisma, User } from '@prisma/client';
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

  async updateUserInfo(userId: number, dto: UpdateUserDto): Promise<void> {
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

    await this.prisma.user.updateMany({
      where: { id: userId },
      data: updateData,
    });
  }

  async registrateUserOnMeetup(
    userId: number,
    meetupId: number,
  ): Promise<void> {
    await this.prisma.userOnMeetup.create({
      data: {
        userId: userId,
        meetupId: meetupId,
      },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.deleteMany({
      where: {
        id: userId,
      },
    });
  }
}
