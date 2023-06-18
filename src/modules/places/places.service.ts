import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Place } from 'src/database/entities';
import { CreatePlaceDto, PlacesDto, UpdatePlaceDto } from './dto';

@Injectable()
export class PlacesService {
  constructor(
    @Inject('PlacesRepository') private readonly placesRepository: typeof Place,
  ) {}

  async getAllPlaces() {
    const places = await this.placesRepository.findAll<Place>();

    return places.map((place) => new PlacesDto(place));
  }

  async getPlace(id: number) {
    const place = await this.placesRepository.findByPk(id);
    if (!place) return new NotFoundException();

    return new PlacesDto(place);
  }

  async addPlace(dto: CreatePlaceDto) {
    const place = new Place();

    place.city = dto.city;
    place.street = dto.street;
    place.building = dto.building;
    place.room = dto.room || null;

    await place.save();
  }

  async updatePlace(dto: UpdatePlaceDto, id: number) {
    const place = await this.placesRepository.findByPk(id);

    place.city = dto.city || place.city;
    place.street = dto.street || place.city;
    place.building = dto.building || place.city;
    place.room = dto.room || place.room;

    place.save();

    return place;
  }

  async deletePlace(id: number) {
    const place = await this.placesRepository.findByPk(id);

    place.destroy();
  }
}
