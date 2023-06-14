import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  getAllPlaces() {
    return 'getAll';
  }

  @Post('create')
  addPlace() {
    return 'place has been added';
  }

  @Put('update/:id')
  updatePlace() {
    return 'place has been updated';
  }

  @Delete('delete/:id')
  deletePlace() {
    return 'place has been deleted';
  }
}
