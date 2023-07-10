import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesRepository } from './repository';
import { SerializeInterceptor } from 'src/common';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, PlacesRepository, SerializeInterceptor],
})
export class PlacesModule {}
