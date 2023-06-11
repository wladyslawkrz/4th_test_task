import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tag, Meetup } from '.';

@Table({ tableName: 'tagsOnMeetups' })
export class TagOnMeetup extends Model<TagOnMeetup> {
  @ForeignKey(() => Tag)
  @Column(DataType.INTEGER)
  tagId: number;

  @ForeignKey(() => Meetup)
  @Column(DataType.INTEGER)
  meetupId: number;
}
