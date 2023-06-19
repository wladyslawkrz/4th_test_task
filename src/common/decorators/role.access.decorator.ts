// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum';

export const Roles = (roles: Role) => SetMetadata('roles', roles);
