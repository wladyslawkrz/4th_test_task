import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesRepository } from './repository/places.repository';
import { PlacesInterceptor } from 'src/common/interceptors';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, PlacesRepository, PlacesInterceptor],
})
export class PlacesModule {}
