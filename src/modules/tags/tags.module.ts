import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { tagsProviders } from './tags.provider';

@Module({
  controllers: [TagsController],
  providers: [TagsService, ...tagsProviders],
})
export class TagsModule {}
