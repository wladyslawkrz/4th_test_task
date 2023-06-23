import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Place } from '@prisma/client';
import { Observable, map } from 'rxjs';
import { PlacesDto } from 'src/modules/places/dto';

@Injectable()
export class PlacesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (Array.isArray(response)) {
          const tags: PlacesDto[] = response.map((place: Place) => {
            return new PlacesDto(place);
          });

          return tags;
        } else {
          return new PlacesDto(response);
        }
      }),
    );
  }
}
