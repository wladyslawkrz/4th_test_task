import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) {}

  async getAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map((user) => new GetUsersDto(user));
  }
}
