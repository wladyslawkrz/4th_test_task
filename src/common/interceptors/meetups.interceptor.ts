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
        if (response.meetups) {
          const meetups: MeetupsDto[] = response.meetups.map(
            (meetup: MeetupWithPlaceAndTags) => {
              const place = this.getPlace(meetup);
              const tags = this.getTags(meetup);

              return new MeetupsDto(meetup, place, tags);
            },
          );
          const page = response.page;
          const limit = response.limit;

          return { page, limit, meetups };
        } else {
          const place = this.getPlace(response);
          const tags = this.getTags(response);

          return new MeetupsDto(response, place, tags);
        }
      }),
    );
  }

  getPlace(meetup: MeetupWithPlaceAndTags): string {
    let place = meetup.place
      ? `${meetup.place.city}, ${meetup.place.street}, ${meetup.place.building}`
      : 'Venue is not specified';
    if (meetup.place.room) place += `, ${meetup.place.room}`;

    return place;
  }

  getTags(meetup: MeetupWithPlaceAndTags): string {
    const tags =
      meetup.tags?.map((tag) => tag.tag.tagName).join(', ') ||
      'Tags are not specified';

    return tags;
  }
}
