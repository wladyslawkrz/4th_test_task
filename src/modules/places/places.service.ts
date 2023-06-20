import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto, PlacesDto, UpdatePlaceDto } from './dto';
import { Place } from '@prisma/client';
import { PlacesRepository } from './repository/places.repository';

@Injectable()
export class PlacesService {
  constructor(private placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    const places = await this.placesRepository.getAllPlaces();

    return places.map((place: Place) => new PlacesDto(place));
  }

  async getPlace(id: number) {
    const place = await this.placesRepository.getOnePlace(Number(id));
    if (!place) throw new NotFoundException('Place not found');

    return new PlacesDto(place);
  }

  async addPlace(dto: CreatePlaceDto) {
    await this.placesRepository.createPlace(dto);
  }

  async updatePlace(dto: UpdatePlaceDto, id: number) {
    if (!(await this.placesRepository.getOnePlace(Number(id))))
      throw new NotFoundException('Place not found');

    await this.placesRepository.updatePlace(Number(id), dto);
  }

  async deletePlace(id: number) {
    if (!(await this.placesRepository.getOnePlace(Number(id))))
      throw new NotFoundException('Place not found');

    await this.placesRepository.deletePlace(Number(id));
  }
}
