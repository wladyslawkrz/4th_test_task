import { Place } from '@prisma/client';

export class PlacesDto {
  id: number;
  city: string;
  street: string;
  building: string;
  room: number;

  constructor(place: Place) {
    this.id = place.id;
    this.city = place.city;
    this.street = place.street;
    this.building = place.building;
    this.room = place.room;
  }
}
