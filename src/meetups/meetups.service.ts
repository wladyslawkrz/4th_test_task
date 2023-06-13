import { Inject, Injectable } from '@nestjs/common';
import { Meetup, Place } from 'src/entities';
import { MeetupsDto } from './dto/meetups.dto';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject('MeetupsRepository')
    private readonly meetupsRepository: typeof Meetup,

    @Inject('PlacesRepository')
    private readonly placesRepository: typeof Place,
  ) {}

  async getAllMeetups() {
    const meetups = await this.meetupsRepository.findAll<Meetup>();
    return meetups.map(
      (meetup) =>
        new MeetupsDto(meetup, this.getMeetingPlaceString(meetup.place)),
    );
  }

  private getMeetingPlaceString(place: Place): string {
    const { city, street, building, room } = place;
    let meetingPlaceString = city + ', ' + street + ', ' + building;
    if (room) {
      meetingPlaceString += ', Room ' + room;
    }
    return meetingPlaceString;
  }
}
