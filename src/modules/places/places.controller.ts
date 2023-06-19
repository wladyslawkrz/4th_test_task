import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Role } from 'src/common/enum';

@UseGuards(JwtAccessGuard)
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  getAllPlaces() {
    return this.placesService.getAllPlaces();
  }

  @Get(':id')
  getPlace(@Param() params: any) {
    return this.placesService.getPlace(params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Post('create')
  addPlace(@Body() dto: CreatePlaceDto) {
    return this.placesService.addPlace(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Put('update/:id')
  updatePlace(@Body() dto: UpdatePlaceDto, @Param() params: any) {
    return this.placesService.updatePlace(dto, params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Delete('delete/:id')
  deletePlace(@Param() params: any) {
    return this.placesService.deletePlace(params.id);
  }
}
