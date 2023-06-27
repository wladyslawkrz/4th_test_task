import { Place, Prisma } from '@prisma/client';
import { CreatePlaceDto, UpdatePlaceDto } from '../dto';

export interface IPlacesRepository {
  getAllPlaces(): Promise<Place[]>;
  getOnePlace(placeId: number): Promise<Place>;
  createPlace(dto: CreatePlaceDto): Promise<Place>;
  updatePlace(
    placeId: number,
    dto: UpdatePlaceDto,
  ): Promise<Prisma.BatchPayload>;
  deletePlace(placeId: number): Promise<Prisma.BatchPayload>;
}
