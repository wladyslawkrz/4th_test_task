import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsRepository } from './repository';
import { SerializeInterceptor } from 'src/common';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, SerializeInterceptor],
})
export class TagsModule {}
