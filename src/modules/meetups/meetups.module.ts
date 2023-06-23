import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './repository/meetups.repository';
import { MeetupsInterceptor } from 'src/common/interceptors';

@Module({
  providers: [MeetupsService, MeetupsRepository, MeetupsInterceptor],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
