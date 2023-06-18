import { Place } from 'src/database/entities';

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
