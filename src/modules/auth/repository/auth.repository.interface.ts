import { User } from '@prisma/client';
import { AuthSignUpDto } from '../dto';

export interface IAuthRepository {
  createUser(dto: AuthSignUpDto, password: string): Promise<User>;
  getUserByCredentials(email: string): Promise<User>;
  getUserById(userId: number): Promise<User>;
  updateRefreshToken(userId: number, token: string): Promise<void>;
  destroyRefreshToken(userId: number): Promise<void>;
}
