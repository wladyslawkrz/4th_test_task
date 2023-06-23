import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlacesInterceptor } from 'src/common/interceptors';

@ApiBearerAuth()
@ApiTags('Places')
@UseGuards(JwtAccessGuard)
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @UseInterceptors(PlacesInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPlaces() {
    return this.placesService.getAllPlaces();
  }

  @UseInterceptors(PlacesInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getPlace(@Param() params: any) {
    return this.placesService.getPlace(params.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  addPlace(@Body() dto: CreatePlaceDto) {
    return this.placesService.addPlace(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updatePlace(@Body() dto: UpdatePlaceDto, @Param() params: any) {
    return this.placesService.updatePlace(dto, params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deletePlace(@Param() params: any) {
    return this.placesService.deletePlace(params.id);
  }
}
