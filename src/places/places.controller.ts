import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('places')
export class PlacesController {
  @Get()
  getAllPlaces() {
    return 'all places';
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
