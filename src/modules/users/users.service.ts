import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UsersDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAll() {
    const users = await this.usersRepository.getAllUsers();
    return users.map((user) => new UsersDto(user));
  }

  async updateMe(myId: number, dto: UpdateUserDto) {
    await this.usersRepository.updateUserInfo(myId, dto);
  }

  async registrateUserOnMeetup(userId: number, dto: RegistrateUserDto) {
    await this.usersRepository.registrateUserOnMeetup(userId, dto.meetupId);
  }

  async deleteMe(myId: number) {
    await this.usersRepository.deleteUser(myId);
  }
}
