import { Module } from '@nestjs/common';
import { TagsController, TagsService, tagsProviders } from '.';

@Module({
  controllers: [TagsController],
  providers: [TagsService, ...tagsProviders],
})
export class TagsModule {}
