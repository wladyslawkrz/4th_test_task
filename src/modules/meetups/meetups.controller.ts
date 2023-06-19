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
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { PostMeetupDto, UpdateMeetupDto, QueryParamsDto } from './dto';
import { JwtAccessGuard, PaginationPipe, Roles, RolesGuard } from 'src/common';
import { Role } from 'src/common/enum';

@UseGuards(JwtAccessGuard)
@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @Get()
  getAllMeetups(
    @Query('page', new PaginationPipe(1)) page: number,
    @Query('limit', new PaginationPipe(10)) limit: number,
    @Query() params: QueryParamsDto,
  ) {
    return this.meetupsService.getAllMeetups(page, limit, params);
  }

  @Get('find/:id')
  getMeetupById(@Param() params: any) {
    return this.meetupsService.getMeetupById(params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Post('create')
  createMeetup(@Body() dto: PostMeetupDto) {
    return this.meetupsService.postMeetup(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Put('update/:id')
  updateMeetupInfo(@Param() params: any, @Body() dto: UpdateMeetupDto) {
    return this.meetupsService.updateMeetupInfo(params.id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteMeetup(@Param() params: any) {
    return this.meetupsService.deleteMeetup(params.id);
  }
}
