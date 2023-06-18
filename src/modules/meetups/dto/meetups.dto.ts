import { Meetup } from 'src/entities';

export class MeetupsDto {
  id: number;
  meetupName: string;
  meetupDescription: string;
  meetingTime: Date;
  meetingPlace: string;

  constructor(meetup: Meetup, place: string) {
    this.id = meetup.id;
    this.meetupName = meetup.meetupName;
    this.meetupDescription = meetup.meetupDescription;
    this.meetingTime = meetup.meetingTime;
    this.meetingPlace = place;
  }
}
