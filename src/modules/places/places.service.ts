import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { PlacesRepository } from './repository/places.repository';

@Injectable()
export class PlacesService {
  private logger = new Logger('PlacesService');

  constructor(private placesRepository: PlacesRepository) {}

  async getAllPlaces() {
    try {
      const places = await this.placesRepository.getAllPlaces();

      this.logger.verbose(
        `Request for a list of places. User got ${places.length} rows.`,
      );

      return places;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async getPlace(id: number) {
    try {
      const place = await this.placesRepository.getOnePlace(id);
      if (!place) throw new NotFoundException('Place not found');

      this.logger.verbose(`Request for place [id ${id}]`);

      return place;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async addPlace(dto: CreatePlaceDto) {
    try {
      await this.placesRepository.createPlace(dto);

      this.logger.verbose(
        `Created place: ${dto.city}, ${dto.street}, ${dto.building}, ${dto.room}`,
      );
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async updatePlace(dto: UpdatePlaceDto, id: number) {
    try {
      if (!(await this.placesRepository.getOnePlace(id)))
        throw new NotFoundException('Place not found');

      await this.placesRepository.updatePlace(id, dto);

      this.logger.verbose(`Place [id ${id}] was updated.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async deletePlace(id: number) {
    try {
      if (!(await this.placesRepository.getOnePlace(id)))
        throw new NotFoundException('Place not found');

      await this.placesRepository.deletePlace(id);

      this.logger.verbose(`Place [id ${id}] was deleted.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }
}
