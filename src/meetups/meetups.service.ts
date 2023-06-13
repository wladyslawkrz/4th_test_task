import { Inject, Injectable, Post } from '@nestjs/common';
import { Meetup, Place } from 'src/entities';
import { MeetupsDto } from './dto/meetups.dto';
import { PostMeetupDto } from './dto/post.meetup.dto';

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

  async getMeetupById(id: number) {
    const meetup = await this.meetupsRepository.findByPk<Meetup>(id);
    return new MeetupsDto(meetup, this.getMeetingPlaceString(meetup.place));
  }

  async postMeetup(dto: PostMeetupDto) {
    const meetup = new Meetup();

    meetup.meetupName = dto.meetupName;
    meetup.meetupDescription = dto.meetupName || null;
    meetup.meetingTime = dto.meetingTime;
    meetup.meetingPlaceId = dto.meetingPlaceId || null;

    if (dto.meetingPlaceId) {
      const place = await this.placesRepository.findOne({
        where: { id: dto.meetingPlaceId },
      });
      meetup.place = place || null;
    }

    meetup.save();
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
