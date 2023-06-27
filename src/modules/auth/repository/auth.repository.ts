import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IAuthRepository } from './auth.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { AuthSignUpDto } from '../dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: AuthSignUpDto, password: string): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHashed: password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        userRole: Role.User,
      },
    });

    return newUser;
  }

  async getUserByCredentials(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async updateRefreshToken(
    userId: number,
    token: string,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: { refreshToken: token },
    });
  }

  async destroyRefreshToken(userId: number): Promise<Prisma.BatchPayload> {
    return await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }
}
