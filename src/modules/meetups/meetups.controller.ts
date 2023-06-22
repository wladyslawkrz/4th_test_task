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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import {
  GetUserId,
  JwtAccessGuard,
  PaginationPipe,
  Roles,
  RolesGuard,
} from 'src/common';
import { Role } from '@prisma/client';
import {
  CertainMeetupInterceptor,
  MeetupsInterceptor,
} from 'src/common/interceptors';

@UseGuards(JwtAccessGuard)
@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @UseInterceptors(MeetupsInterceptor)
  @Get()
  getAllMeetups(
    @Query('page', new PaginationPipe(1)) page: number,
    @Query('limit', new PaginationPipe(10)) limit: number,
    @Query() params: QueryParamsDto,
  ) {
    return this.meetupsService.getAllMeetups(page, limit, params);
  }

  @UseInterceptors(CertainMeetupInterceptor)
  @Get('find/:id')
  getMeetupById(@Param() params: any) {
    return this.meetupsService.getMeetupById(params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  createMeetup(@GetUserId() userId: number, @Body() dto: PostMeetupDto) {
    return this.meetupsService.postMeetup(userId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updateMeetupInfo(@Param() params: any, @Body() dto: UpdateMeetupDto) {
    return this.meetupsService.updateMeetupInfo(params.id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteMeetup(@Param() params: any) {
    return this.meetupsService.deleteMeetup(Number(params.id));
  }
}
