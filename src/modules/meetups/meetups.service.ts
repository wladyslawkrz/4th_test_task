import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Meetup, Place } from 'src/database/entities';
import { MeetupsDto, PostMeetupDto, UpdateMeetupDto } from './dto';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject('MeetupsRepository')
    private readonly meetupsRepository: typeof Meetup,

    @Inject('PlacesRepository')
    private readonly placesRepository: typeof Place,
  ) {}

  async getAllMeetups(page: number, limit: number) {
    const meetups = await this.meetupsRepository.findAndCountAll<Meetup>({
      limit: limit,
      offset: limit * (page - 1),
    });

    const { count, rows } = meetups;
    rows.map(
      (meetup) =>
        new MeetupsDto(meetup, this.getMeetingPlaceString(meetup.place)),
    );

    return { count, page, limit, rows };
  }

  async getMeetupById(id: number) {
    const meetup = await this.meetupsRepository.findByPk<Meetup>(id);
    if (!meetup) return new NotFoundException('This meetup was not found');

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

  async updateMeetupInfo(meetupId: number, dto: UpdateMeetupDto) {
    const meetup = await this.meetupsRepository.findByPk(meetupId);
    if (!meetup) return new NotFoundException('This meetup was not found');

    meetup.meetupName = dto.meetupName || meetup.meetupName;
    meetup.meetupDescription = dto.meetupName || meetup.meetupDescription;
    meetup.meetingTime = dto.meetingTime || meetup.meetingTime;
    meetup.meetingPlaceId = dto.meetingPlaceId || meetup.meetingPlaceId;

    if (dto.meetingPlaceId) {
      const place = await this.placesRepository.findOne({
        where: { id: dto.meetingPlaceId },
      });
      meetup.place = place;
    }

    meetup.save();
  }

  async deleteMeetup(meetupId: number) {
    const meetup = await this.meetupsRepository.findByPk(meetupId);
    if (!meetup) return new NotFoundException('This meetup was not found');

    meetup.destroy();
  }

  private getMeetingPlaceString(place: Place): string {
    if (!place) {
      return 'Venue not specified';
    }

    const { city, street, building, room } = place;
    let meetingPlaceString = city + ', ' + street + ', ' + building;
    if (room) {
      meetingPlaceString += ', Room ' + room;
    }

    return meetingPlaceString;
  }
}
