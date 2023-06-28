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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PlacesInterceptor } from 'src/common/interceptors';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Access token required',
})
@ApiInternalServerErrorResponse({
  description: 'An error occurred while executing the request on the server',
})
@ApiTags('Places')
@UseGuards(JwtAccessGuard)
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @ApiOperation({ summary: 'Get a list places' })
  @ApiOkResponse({ description: 'Data received successfully' })
  @UseInterceptors(PlacesInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPlaces(): Promise<Place[]> {
    return this.placesService.getAllPlaces();
  }

  @ApiOperation({ summary: 'Get a specific place' })
  @ApiOkResponse({ description: 'Data received successfully' })
  @ApiNotFoundResponse({ description: 'Place not found' })
  @ApiParam({ name: 'id', description: 'Enter place id' })
  @UseInterceptors(PlacesInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getPlace(@Param('id', ParseIntPipe) id: number): Promise<Place> {
    return this.placesService.getPlace(id);
  }

  @ApiOperation({ summary: 'Create new place' })
  @ApiCreatedResponse({ description: 'New place has been created' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  addPlace(@Body() dto: CreatePlaceDto): Promise<Place> {
    return this.placesService.addPlace(dto);
  }

  @ApiOperation({ summary: 'Update specific place info' })
  @ApiOkResponse({ description: 'Place has been updated successfully' })
  @ApiNotFoundResponse({ description: 'Place not found' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
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

  @ApiOperation({ summary: 'Delete place' })
  @ApiOkResponse({ description: 'Place has been deleted successfully' })
  @ApiNotFoundResponse({ description: 'Place not found' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
  @ApiParam({ name: 'id', description: 'Enter place id' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deletePlace(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prisma.BatchPayload> {
    return this.placesService.deletePlace(id);
  }
}
