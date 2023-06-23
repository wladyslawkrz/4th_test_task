import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable, map } from 'rxjs';
import { UsersDto } from 'src/modules/users/dto';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (Array.isArray(response)) {
          const users: UsersDto[] = response.map((user: User) => {
            return new UsersDto(user);
          });

          return users;
        } else {
          const user = new UsersDto(response);

          return user;
        }
      }),
    );
  }
}
