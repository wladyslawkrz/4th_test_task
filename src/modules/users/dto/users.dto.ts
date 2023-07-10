import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UsersDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  userRole: Role;
}
