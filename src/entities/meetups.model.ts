import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  IsDate,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Place, Tag, TagOnMeetup, User, UserOnMeetup } from '.';

@Table({ tableName: 'meetups' })
export class Meetup extends Model<Meetup> {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @AllowNull(false)
  @Length({ min: 5, max: 30 })
  @Column(DataType.STRING)
  meetupName: string;

  @AllowNull
  @Length({ max: 200 })
  @Column(DataType.STRING)
  meetupDescription: string;

  @BelongsToMany(() => Tag, () => TagOnMeetup)
  tags: Tag[];

  @BelongsToMany(() => Meetup, () => UserOnMeetup)
  users: User[];

  @AllowNull(false)
  @IsDate
  @Column(DataType.DATE)
  meetingTime: Date;

  @AllowNull
  @ForeignKey(() => Place)
  @Column(DataType.INTEGER)
  meetingPlaceId: number;

  @BelongsTo(() => Place)
  place: Place;
}
