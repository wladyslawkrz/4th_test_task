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
    let place = '';

    if (meetup.place) {
      place = `${meetup.place.city}, ${meetup.place.street}, ${meetup.place.building}`;
      if (meetup.place.room) place += `, ${meetup.place.room}`;
    } else {
      place = 'Venue is not specified';
    }

    return place;
  }

  getTags(meetup: MeetupWithPlaceAndTags): string {
    const tags =
      meetup.tags?.map((tag) => tag.tag.tagName).join(', ') ||
      'Tags are not specified';

    return tags;
  }
}
