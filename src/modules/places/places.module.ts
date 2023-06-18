import { Module } from '@nestjs/common';
import { PlacesController, PlacesService, placesProviders } from '.';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, ...placesProviders],
})
export class PlacesModule {}
