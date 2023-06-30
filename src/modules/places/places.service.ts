import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { Place, Prisma } from '@prisma/client';
import { PlacesRepository } from './repository';

@Injectable()
export class PlacesService {
  private logger = new Logger('PlacesService');

  constructor(private placesRepository: PlacesRepository) {}

  async getAllPlaces(): Promise<Place[]> {
    const places = await this.placesRepository.getAllPlaces();

    this.logger.verbose(
      `Request for a list of places. User got ${places.length} rows.`,
    );

    return places;
  }

  async getPlace(id: number): Promise<Place> {
    const place = await this.placesRepository.getOnePlace(id);
    if (!place) throw new NotFoundException('Place not found');

    this.logger.verbose(`Request for place [id ${id}]`);

    return place;
  }

  async addPlace(dto: CreatePlaceDto): Promise<Place> {
    const creationResult = await this.placesRepository.createPlace(dto);

    this.logger.verbose(
      `Created place: ${dto.city}, ${dto.street}, ${dto.building}, ${dto.room}`,
    );

    return creationResult;
  }

  async updatePlace(
    dto: UpdatePlaceDto,
    id: number,
  ): Promise<Prisma.BatchPayload> {
    if (!(await this.placesRepository.getOnePlace(id)))
      throw new NotFoundException('Place not found');

    const updateResult = await this.placesRepository.updatePlace(id, dto);

    this.logger.verbose(`Place [id ${id}] was updated.`);

    return updateResult;
  }

  async deletePlace(id: number): Promise<Prisma.BatchPayload> {
    if (!(await this.placesRepository.getOnePlace(id)))
      throw new NotFoundException('Place not found');

    const deletionResult = await this.placesRepository.deletePlace(id);

    this.logger.verbose(`Place [id ${id}] was deleted.`);

    return deletionResult;
  }
}
