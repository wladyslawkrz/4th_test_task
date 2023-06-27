import { Prisma, User, UserOnMeetup } from '@prisma/client';

export interface IUsersRepository {
  getCurrentUser(userId: number): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserInfo(
    userId: number,
    updateData: Prisma.UserUpdateInput,
  ): Promise<Prisma.BatchPayload>;
  registrateUserOnMeetup(
    userId: number,
    meetupId: number,
  ): Promise<UserOnMeetup>;
}
