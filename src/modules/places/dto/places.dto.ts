import { Place } from '@prisma/client';

export class PlacesDto {
  city: string;
  street: string;
  building: string;
  room: number;

  constructor(place: Place) {
    this.city = place.city;
    this.street = place.street;
    this.building = place.building;
    this.room = place.room;
  }
}
