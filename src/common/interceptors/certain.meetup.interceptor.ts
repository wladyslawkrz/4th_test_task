import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetupsDto } from 'src/modules/meetups/dto';
import { MeetupWithPlaceAndTags } from '../types';

@Injectable()
export class CertainMeetupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: MeetupWithPlaceAndTags) => {
        let place = response.place
          ? `${response.place.city}, ${response.place.street}, ${response.place.building}`
          : 'Venue is not specified';
        if (response.place.room) place += `, ${response.place.room}`;

        const tags =
          response.tags?.map((tag) => tag.tag.tagName).join(', ') ||
          'Tags are not specified';

        return new MeetupsDto(response, place, tags);
      }),
    );
  }
}
