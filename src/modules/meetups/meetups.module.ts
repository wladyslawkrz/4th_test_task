import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './repository/meetups.repository';
import {
  CertainMeetupInterceptor,
  MeetupsInterceptor,
} from 'src/common/interceptors';

@Module({
  providers: [
    MeetupsService,
    MeetupsRepository,
    MeetupsInterceptor,
    CertainMeetupInterceptor,
  ],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
