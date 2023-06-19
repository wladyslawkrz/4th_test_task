import { Meetup } from 'src/database/entities';

export class MeetupsDto {
  id: number;
  meetupName: string;
  meetupDescription: string;
  meetingTime: Date;
  meetingPlace: string;
  tags?: string;

  constructor(meetup: Meetup, place: string, tags: string) {
    this.id = meetup.id;
    this.meetupName = meetup.meetupName;
    this.meetupDescription = meetup.meetupDescription;
    this.meetingTime = meetup.meetingTime;
    this.meetingPlace = place;
    this.tags = tags;
  }
}
