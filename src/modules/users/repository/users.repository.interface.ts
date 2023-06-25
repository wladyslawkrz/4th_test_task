import { User, UserOnMeetup } from '@prisma/client';
import { UpdateUserDto } from '../dto';

export interface IUsersRepository {
  getCurrentUser(userId: number): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserInfo(userId: number, dto: UpdateUserDto): Promise<User>;
  registrateUserOnMeetup(
    userId: number,
    meetupId: number,
  ): Promise<UserOnMeetup>;
}
