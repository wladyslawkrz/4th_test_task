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

@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @Get()
  getAllMeetups() {
    return this.meetupsService.getAllMeetups();
  }

  @Get('find/:id')
  getMeetupById(@Param() id: any) {
    return this.meetupsService.getMeetupById(id.id);
  }

  @Post('create')
  createMeetup(@Body() dto: PostMeetupDto) {
    return this.meetupsService.postMeetup(dto);
  }

  @Put('update/:id')
  updateMeetupInfo() {
    return 'meetup info has been updated';
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
