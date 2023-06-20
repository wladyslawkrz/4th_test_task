import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './repository/meetups.repository';

@Module({
  providers: [MeetupsService, MeetupsRepository],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
