import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { PlacesRepository } from './repository/places.repository';

@Injectable()
export class PlacesService {
  private logger = new Logger('PlacesService');

  constructor(private placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    const places = await this.placesRepository.getAllPlaces();

    this.logger.verbose(
      `Request for a list of places. User got ${places.length} rows.`,
    );

    return places;
  }

  async getPlace(id: number) {
    const place = await this.placesRepository.getOnePlace(Number(id));
    if (!place) throw new NotFoundException('Place not found');

    this.logger.verbose(`Request for place [id ${id}]`);

    return place;
  }

  async addPlace(dto: CreatePlaceDto) {
    await this.placesRepository.createPlace(dto);

    this.logger.verbose(
      `Created place: ${dto.city}, ${dto.street}, ${dto.building}, ${dto.room}`,
    );
  }

  async updatePlace(dto: UpdatePlaceDto, id: number) {
    if (!(await this.placesRepository.getOnePlace(Number(id))))
      throw new NotFoundException('Place not found');

    await this.placesRepository.updatePlace(Number(id), dto);

    this.logger.verbose(`Place [id ${id}] was updated.`);
  }

  async deletePlace(id: number) {
    if (!(await this.placesRepository.getOnePlace(Number(id))))
      throw new NotFoundException('Place not found');

    await this.placesRepository.deletePlace(Number(id));

    this.logger.verbose(`Place [id ${id}] was deleted.`);
  }
}
