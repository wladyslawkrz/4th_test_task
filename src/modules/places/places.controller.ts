import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Place, Prisma, Role } from '@prisma/client';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
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
  getAllPlaces(): Promise<Place[]> {
    return this.placesService.getAllPlaces();
  }

  @ApiParam({ name: 'id', description: 'Enter place id' })
  @UseInterceptors(PlacesInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getPlace(@Param('id', ParseIntPipe) id: number): Promise<Place> {
    return this.placesService.getPlace(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  addPlace(@Body() dto: CreatePlaceDto): Promise<Place> {
    return this.placesService.addPlace(dto);
  }

  @ApiParam({ name: 'id', description: 'Enter place id' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updatePlace(
    @Body() dto: UpdatePlaceDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prisma.BatchPayload> {
    return this.placesService.updatePlace(dto, id);
  }

  @ApiParam({ name: 'id', description: 'Enter place id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deletePlace(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prisma.BatchPayload> {
    return this.placesService.deletePlace(id);
  }
}
