import { Role, User } from '@prisma/client';

export class UsersDto {
  id: number;
  firstName: string;
  lastName: string;
  userRole: Role;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userRole = user.userRole;
  }
}
