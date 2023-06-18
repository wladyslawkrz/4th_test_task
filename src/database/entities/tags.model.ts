import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Meetup, TagOnMeetup } from '.';

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  tagName: string;

  @BelongsToMany(() => Meetup, () => TagOnMeetup)
  meetups: Meetup[];
}
