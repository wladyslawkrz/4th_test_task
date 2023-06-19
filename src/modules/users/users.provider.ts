import { Meetup, User } from 'src/database/entities';

export const UsersRepository = Symbol('UsersRepository');
export const MeetupsRepository = Symbol('MeetupsRepository');

export const usersProviders = [
  { provide: UsersRepository, useValue: User },
  { provide: MeetupsRepository, useValue: Meetup },
];
