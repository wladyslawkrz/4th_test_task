import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagsInterceptor } from 'src/common/interceptors';

@ApiBearerAuth()
@ApiTags('Tags')
@UseGuards(JwtAccessGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllTags() {
    return this.tagsService.getAll();
  }

  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getTag(@Param() params: any) {
    return this.tagsService.getTag(params.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updateTag(@Param() params: any, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateTag(dto, params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deleteTag(@Param() params: any) {
    return this.tagsService.deleteTag(params.id);
  }
}
