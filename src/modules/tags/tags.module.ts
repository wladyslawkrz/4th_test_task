import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsRepository } from './repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
})
export class TagsModule {}
