import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UsersDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) {}

  async getAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map((user) => new UsersDto(user));
  }

  async updateMe(myId: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<User>(myId);

    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.userRole = dto.userRole || user.userRole;

    try {
      const data = await user.save();
      return new UsersDto(data);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteMe(myId: number) {
    const user = await this.usersRepository.findByPk<User>(myId);
    await user.destroy();
  }
}
