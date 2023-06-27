import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { UsersRepository } from './repository/users.repository';
import { Prisma, User, UserOnMeetup } from '@prisma/client';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private usersRepository: UsersRepository) {}

  async getCurrentUser(userId: number): Promise<User> {
    const user = await this.usersRepository.getCurrentUser(userId);

    this.logger.verbose(`The user [id ${userId}] has received their data`);

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.getAllUsers();

    this.logger.verbose(
      `Request for a complete list of users: ${users.length} rows`,
    );

    return users;
  }

  async updateCurrentUser(
    myId: number,
    dto: UpdateUserDto,
  ): Promise<Prisma.BatchPayload> {
    const updateResults = await this.usersRepository.updateUserInfo(
      myId,
      this.getUpdateUserInput(dto),
    );

    this.logger.verbose(`User [id ${myId}] was updated.`);

    return updateResults;
  }

  async registrateUserOnMeetup(
    userId: number,
    dto: RegistrateUserDto,
  ): Promise<UserOnMeetup> {
    const registrationResult =
      await this.usersRepository.registrateUserOnMeetup(userId, dto.meetupId);

    this.logger.verbose(
      `User [id ${userId}] was registrated on meetup [id ${dto.meetupId}]`,
    );

    return registrationResult;
  }

  getUpdateUserInput(dto: UpdateUserDto) {
    const updateData: Prisma.UserUpdateInput = {};

    if (dto.firstName) {
      updateData.firstName = dto.firstName;
    }

    if (dto.lastName) {
      updateData.lastName = dto.lastName;
    }

    if (dto.userRole) {
      updateData.userRole = dto.userRole;
    }

    return updateData;
  }
}
