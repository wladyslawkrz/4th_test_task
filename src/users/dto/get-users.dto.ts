import { User } from 'src/entities';
import { Role } from 'src/entities/enum';

export class GetUsersDto {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly userRole: Role;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userRole = user.userRole;
  }
}
