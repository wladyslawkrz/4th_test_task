import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsRepository } from './repository';
import { TagsInterceptor } from 'src/common/interceptors';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, TagsInterceptor],
})
export class TagsModule {}
