import { User } from 'src/entities';

export const UsersRepository = Symbol('UsersRepository');

export const authProviders = [{ provide: UsersRepository, useValue: User }];
