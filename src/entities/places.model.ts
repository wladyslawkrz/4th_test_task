import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Meetup } from '.';

@Table({ tableName: 'places' })
export class Place extends Model<Place> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Length({ max: 25 })
  @Column(DataType.STRING)
  city: string;

  @AllowNull(false)
  @Length({ max: 40 })
  @Column(DataType.STRING)
  street: string;

  @AllowNull(false)
  @Length({ max: 15 })
  @Column(DataType.STRING)
  building: string;

  @AllowNull
  @Column(DataType.INTEGER)
  room: number;

  @HasMany(() => Meetup)
  meetups: Meetup[];
}
