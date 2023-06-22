import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetupWithPlaceAndTags } from '../types';
import { MeetupsDto } from 'src/modules/meetups/dto';

@Injectable()
export class MeetupsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const meetups: MeetupsDto = response.meetups.map(
          (meetup: MeetupWithPlaceAndTags) => {
            let place = meetup.place
              ? `${meetup.place.city}, ${meetup.place.street}, ${meetup.place.building}`
              : 'Venue is not specified';
            if (meetup.place.room) place += `, ${meetup.place.room}`;

            const tags =
              meetup.tags?.map((tag) => tag.tag.tagName).join(', ') ||
              'Tags are not specified';
            return new MeetupsDto(meetup, place, tags);
          },
        );

        const page = response.page;
        const limit = response.limit;

        return { page, limit, meetups };
      }),
    );
  }
}
