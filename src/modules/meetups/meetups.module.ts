import { Module } from '@nestjs/common';
import { MeetupsService, MeetupsController, meetupsProviders } from '.';

@Module({
  providers: [MeetupsService, ...meetupsProviders],
  controllers: [MeetupsController],
})
export class MeetupsModule {}
