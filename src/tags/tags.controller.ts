import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAllTags() {
    return this.tagsService.getAll();
  }

  @Post('create')
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @Put('update/:id')
  updateTag(@Param() params: any, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateTag(dto, params.id);
  }

  @Delete('delete/:id')
  deleteTag(@Param() params: any) {
    return this.tagsService.deleteTag(params.id);
  }
}
