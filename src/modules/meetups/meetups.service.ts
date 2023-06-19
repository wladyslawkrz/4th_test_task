import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Meetup, Place, Tag } from 'src/database/entities';
import { Op, WhereOptions } from 'sequelize';
import {
  MeetupsDto,
  PostMeetupDto,
  UpdateMeetupDto,
  QueryParamsDto,
} from './dto';
import { MeetupsRepository, PlacesRepository } from './meetups.provider';
import { SortDirections } from 'src/common/enum';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject(MeetupsRepository)
    private readonly meetupsRepository: typeof Meetup,

    @Inject(PlacesRepository)
    private readonly placesRepository: typeof Place,
  ) {}

  async getAllMeetups(page: number, limit: number, dto: QueryParamsDto) {
    const sortDirection = dto.sort || SortDirections.descending;

    const meetups = await this.meetupsRepository.findAndCountAll<Meetup>({
      limit: limit,
      offset: limit * (page - 1),
      include: [Place, Tag],
      where: this.getWhereCondition(dto),
      order: [['meetingTime', sortDirection]],
    });

    const { rows } = meetups;

    const data = rows.map(
      (meetup) =>
        new MeetupsDto(
          meetup,
          this.getMeetingPlaceString(meetup.place),
          this.getTagsString(meetup.tags),
        ),
    );

    return { page, limit, data };
  }

  async getMeetupById(id: number) {
    const meetup = await this.meetupsRepository.findByPk<Meetup>(id, {
      include: [Place, Tag],
    });
    if (!meetup) return new NotFoundException('This meetup was not found');

    return new MeetupsDto(
      meetup,
      this.getMeetingPlaceString(meetup.place),
      this.getTagsString(meetup.tags),
    );
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

    await meetup.save();

    if (dto.tags) {
      const tags = await Tag.findAll({ where: { id: dto.tags } });
      await meetup.$add('tags', tags);
    }

    return meetup;
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

  private getWhereCondition(dto: QueryParamsDto): WhereOptions<Meetup> {
    const whereCondition: WhereOptions<Meetup> = {};

    if (dto.meetup)
      whereCondition.meetupName = { [Op.like]: `%${dto.meetup}%` };

    if (dto.description)
      whereCondition.meetupDescription = { [Op.like]: `%${dto.description}%` };

    if (dto.timefrom) {
      whereCondition.meetingTime = { [Op.gte]: dto.timefrom };
    }

    if (dto.timeto) {
      if (whereCondition.meetingTime) {
        whereCondition.meetingTime[Op.lte] = dto.timeto;
      } else {
        whereCondition.meetingTime = { [Op.lte]: dto.timeto };
      }
    }

    return whereCondition;
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

  private getTagsString(tags: Tag[]): string {
    return tags.map((tag) => tag.tagName).join(', ');
  }
}
