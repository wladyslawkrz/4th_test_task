import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('meetups')
export class MeetupsController {
  @Get()
  getAllMeetups() {
    return 'all of the meetups r here';
  }

  @Get(':id')
  getMeetupById(@Param() params: any) {
    return `this is ${params.id} meetup`;
  }

  @Post('create')
  createMeetup() {
    return 'meetup has been created';
  }

  @Put('update/:id')
  updateMeetupInfo() {
    return 'meetup info has been updated';
  }

  @Delete('delete/:id')
  deleteMeetup() {
    return 'meetup has been deleted';
  }

  @Get()
  getMeetups(
    @Query('search') search: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    return 'search/filter/sort';
  }
}
