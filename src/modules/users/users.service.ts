import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private usersRepository: UsersRepository) {}

  async getCurrentUser(userId: number) {
    try {
      const user = await this.usersRepository.getCurrentUser(userId);

      this.logger.verbose(`The user [id ${userId}] has received their data`);

      return user;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async getAll() {
    try {
      const users = await this.usersRepository.getAllUsers();

      this.logger.verbose(
        `Request for a complete list of users: ${users.length} rows`,
      );

      return users;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async updateCurrentUser(myId: number, dto: UpdateUserDto) {
    try {
      await this.usersRepository.updateUserInfo(myId, dto);

      this.logger.verbose(`User [id ${myId}] was updated.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async registrateUserOnMeetup(userId: number, dto: RegistrateUserDto) {
    try {
      await this.usersRepository.registrateUserOnMeetup(userId, dto.meetupId);

      this.logger.verbose(
        `User [id ${userId}] was registrated on meetup [id ${dto.meetupId}]`,
      );
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }
}
