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
} from '@nestjs/common';
import {
  PostMeetupDto,
  UpdateMeetupDto,
  PaginationPipe,
  MeetupsService,
} from '.';

@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @Get()
  getAllMeetups(
    @Query('page', new PaginationPipe(1)) page: number,
    @Query('limit', new PaginationPipe(10)) limit: number,
  ) {
    return this.meetupsService.getAllMeetups(page, limit);
  }

  @Get('find/:id')
  getMeetupById(@Param() params: any) {
    return this.meetupsService.getMeetupById(params.id);
  }

  @Post('create')
  createMeetup(@Body() dto: PostMeetupDto) {
    return this.meetupsService.postMeetup(dto);
  }

  @Put('update/:id')
  updateMeetupInfo(@Param() params: any, @Body() dto: UpdateMeetupDto) {
    return this.meetupsService.updateMeetupInfo(params.id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteMeetup(@Param() params: any) {
    return this.meetupsService.deleteMeetup(params.id);
  }
}