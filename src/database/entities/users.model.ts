import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  IsEmail,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Meetup, UserOnMeetup } from '.';
import { Role } from '../../common/enum';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  passwordHashed: string;

  @AllowNull
  @Length({ max: 40 })
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull
  @Length({ max: 40 })
  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Role)))
  userRole: Role;

  @AllowNull
  @Column(DataType.STRING)
  refreshToken: string;

  @BelongsToMany(() => Meetup, () => UserOnMeetup)
  meetups: Meetup[];
}
