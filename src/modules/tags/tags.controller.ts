import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Role } from 'src/common/enum';

@UseGuards(JwtAccessGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAllTags() {
    return this.tagsService.getAll();
  }

  @Get(':id')
  getTag(@Param() params: any) {
    return this.tagsService.getTag(params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Post('create')
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Put('update/:id')
  updateTag(@Param() params: any, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateTag(dto, params.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.organizer)
  @Delete('delete/:id')
  deleteTag(@Param() params: any) {
    return this.tagsService.deleteTag(params.id);
  }
}
