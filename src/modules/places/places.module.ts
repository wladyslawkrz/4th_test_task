import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { placesProviders } from './places.provider';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, ...placesProviders],
})
export class PlacesModule {}
