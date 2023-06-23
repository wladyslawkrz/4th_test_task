import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { PlacesRepository } from './repository/places.repository';

@Injectable()
export class PlacesService {
  constructor(private placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    const places = await this.placesRepository.getAllPlaces();

    return places;
  }

  async getPlace(id: number) {
    const place = await this.placesRepository.getOnePlace(Number(id));
    if (!place) throw new NotFoundException('Place not found');

    return place;
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
