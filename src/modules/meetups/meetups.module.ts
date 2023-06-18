import { Module } from '@nestjs/common';
import { meetupsProviders } from './meetups.provider';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';

@Module({
  providers: [MeetupsService, ...meetupsProviders],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
