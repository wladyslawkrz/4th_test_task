import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Meetup, User } from 'src/database/entities';
import { UpdateUserDto, UsersDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { MeetupsRepository, UsersRepository } from './users.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: typeof User,

    @Inject(MeetupsRepository)
    private readonly meetupsRepository: typeof Meetup,
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

  async registrateUserOnMeetup(userId: number, dto: RegistrateUserDto) {
    const user = await this.usersRepository.findByPk<User>(userId);
    const meetup = await this.meetupsRepository.findByPk<Meetup>(dto.meetupId);

    await user.$add('meetup', meetup);
  }

  async deleteMe(myId: number) {
    const user = await this.usersRepository.findByPk<User>(myId);
    await user.destroy();
  }
}
