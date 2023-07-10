import { Expose } from 'class-transformer';

export class PlacesDto {
  @Expose()
  id: number;

  @Expose()
  city: string;

  @Expose()
  street: string;

  @Expose()
  building: string;

  @Expose()
  room: number;
}
