import { Place } from '@prisma/client';
import { CreatePlaceDto, UpdatePlaceDto } from '../dto';

export interface IPlacesRepository {
  getAllPlaces(): Promise<Place[]>;
  getOnePlace(placeId: number): Promise<Place>;
  createPlace(dto: CreatePlaceDto): Promise<void>;
  updatePlace(placeId: number, dto: UpdatePlaceDto): Promise<void>;
  deletePlace(placeId: number): Promise<void>;
}
