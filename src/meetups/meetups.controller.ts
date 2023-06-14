import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { PostMeetupDto } from './dto/post.meetup.dto';
import { UpdateMeetupDto } from './dto/update.meetup.dto';

@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @Get()
  getAllMeetups() {
    return this.meetupsService.getAllMeetups();
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

  @Delete('delete/:id')
  deleteMeetup(@Param() params: any) {
    return 'meetup has been deleted';
  }

  @Get('find')
  getMeetups(
    @Query('search') search: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return 'search/filter/sort';
  }
}
