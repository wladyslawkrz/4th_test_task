import { User } from 'src/entities';

export const usersProviders = [{ provide: 'UsersRepository', useValue: User }];
