import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  getAllPlaces() {
    return this.placesService.getAllPlaces();
  }

  @Post('create')
  addPlace(@Body() dto: CreatePlaceDto) {
    return this.placesService.addPlace(dto);
  }

  @Put('update/:id')
  updatePlace(@Body() dto: UpdatePlaceDto, @Param() params: any) {
    return this.placesService.updatePlace(dto, params.id);
  }

  @Delete('delete/:id')
  deletePlace(@Param() params: any) {
    return this.placesService.deletePlace(params.id);
  }
}
