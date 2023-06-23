import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Tag } from '@prisma/client';
import { Observable, map } from 'rxjs';
import { TagsDto } from 'src/modules/tags/dto';

@Injectable()
export class TagsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (Array.isArray(response)) {
          const tags: TagsDto[] = response.map((tag: Tag) => {
            return new TagsDto(tag);
          });

          return tags;
        } else {
          return new TagsDto(response);
        }
      }),
    );
  }
}
