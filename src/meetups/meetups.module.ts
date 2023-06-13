import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { meetupsProviders } from './meetups.provider';

@Module({
  providers: [MeetupsService, ...meetupsProviders],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
