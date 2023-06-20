import { Place } from '@prisma/client';
import { IPlacesRepository } from './places.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreatePlaceDto, UpdatePlaceDto } from '../dto';

@Injectable()
export class PlacesRepository implements IPlacesRepository {
  constructor(private prisma: PrismaService) {}

  async getAllPlaces(): Promise<Place[]> {
    const places = await this.prisma.place.findMany();

    return places;
  }

  async getOnePlace(placeId: number): Promise<Place> {
    const place = await this.prisma.place.findUnique({
      where: {
        id: placeId,
      },
    });

    return place;
  }

  async createPlace(dto: CreatePlaceDto): Promise<void> {
    await this.prisma.place.create({
      data: dto,
    });
  }

  async updatePlace(placeId: number, dto: UpdatePlaceDto): Promise<void> {
    await this.prisma.place.update({
      where: { id: placeId },
      data: dto,
    });
  }

  async deletePlace(placeId: number): Promise<void> {
    await this.prisma.place.delete({
      where: {
        id: placeId,
      },
    });
  }
}
