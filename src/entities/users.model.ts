import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  IsEmail,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Meetup, Role, UserOnMeetup } from '.';

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
  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  userRoleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsToMany(() => Meetup, () => UserOnMeetup)
  meetups: Meetup[];
}
