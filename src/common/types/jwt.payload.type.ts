import { Role } from '../enum';

export type JwtPayload = {
  sub: number;
  email: string;
  role: Role;
};
