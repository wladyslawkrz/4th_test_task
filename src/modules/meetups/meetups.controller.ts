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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import {
  GetUserId,
  JwtAccessGuard,
  MeetupWithPlaceAndTags,
  PaginationPipe,
  Roles,
  RolesGuard,
} from 'src/common';
import { Meetup, Prisma, Role } from '@prisma/client';
import { MeetupsInterceptor } from 'src/common/interceptors';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Meetup actions')
@UseGuards(JwtAccessGuard)
@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(MeetupsInterceptor)
  @Get()
  getAllMeetups(
    @Query('page', new PaginationPipe(1)) page: number,
    @Query('limit', new PaginationPipe(10)) limit: number,
    @Query() params: QueryParamsDto,
  ): Promise<{
    page: number;
    limit: number;
    meetups: MeetupWithPlaceAndTags[];
  }> {
    return this.meetupsService.getAllMeetups(page, limit, params);
  }

  @ApiParam({ name: 'id', description: 'Enter meetup id' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(MeetupsInterceptor)
  @Get(':id')
  getMeetupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupWithPlaceAndTags> {
    return this.meetupsService.getMeetupById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  createMeetup(
    @GetUserId() userId: number,
    @Body() dto: PostMeetupDto,
  ): Promise<Meetup> {
    return this.meetupsService.postMeetup(userId, dto);
  }

  @ApiParam({ name: 'id', description: 'Enter meetup id' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updateMeetupInfo(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<Prisma.BatchPayload> {
    return this.meetupsService.updateMeetupInfo(userId, id, dto);
  }

  @ApiParam({ name: 'id', description: 'Enter meetup id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deleteMeetup(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prisma.BatchPayload> {
    return this.meetupsService.deleteMeetup(userId, id);
  }
}
