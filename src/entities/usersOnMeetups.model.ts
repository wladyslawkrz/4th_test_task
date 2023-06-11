import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Meetup, User } from '.';

@Table({ tableName: 'usersOnMeetup' })
export class UserOnMeetup extends Model<UserOnMeetup> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Meetup)
  @Column(DataType.INTEGER)
  meetupId: number;
}
