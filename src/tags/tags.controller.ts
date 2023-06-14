import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('tags')
export class TagsController {
  @Get()
  getAllTags() {
    return 'all tags';
  }

  @Post('create')
  createTag() {
    return 'tag created';
  }

  @Put('update/:id')
  updateTag() {
    return 'tag updated';
  }

  @Delete('delete/:id')
  deleteTag() {
    return 'tag deleted';
  }
}
