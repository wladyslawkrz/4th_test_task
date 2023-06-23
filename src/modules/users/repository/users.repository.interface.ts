import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto';

export interface IUsersRepository {
  getCurrentUser(userId: number): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserInfo(userId: number, dto: UpdateUserDto): Promise<void>;
  registrateUserOnMeetup(userId: number, meetupId: number): Promise<void>;
  deleteUser(userId: number): Promise<void>;
}
