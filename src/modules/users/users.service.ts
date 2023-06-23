import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getCurrentUser(userId: number) {
    const user = await this.usersRepository.getCurrentUser(userId);

    return user;
  }

  async getAll() {
    const users = await this.usersRepository.getAllUsers();
    return users;
  }

  async updateCurrentUser(myId: number, dto: UpdateUserDto) {
    await this.usersRepository.updateUserInfo(myId, dto);
  }

  async registrateUserOnMeetup(userId: number, dto: RegistrateUserDto) {
    await this.usersRepository.registrateUserOnMeetup(userId, dto.meetupId);
  }

  async deleteCurrentUser(myId: number) {
    await this.usersRepository.deleteUser(myId);
  }
}
