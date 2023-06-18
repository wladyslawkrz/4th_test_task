import { User } from 'src/database/entities';

export const usersProviders = [{ provide: 'UsersRepository', useValue: User }];
