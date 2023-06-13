import { User } from 'src/entities';
import { Role } from 'src/entities/enum';

export class GetAllUsersDto {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userRole: Role;

  constructor(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userRole = user.userRole;
  }
}
