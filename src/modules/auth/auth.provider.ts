import { User } from 'src/database/entities';

export const UsersRepository = Symbol('UsersRepository');

export const authProviders = [{ provide: UsersRepository, useValue: User }];
