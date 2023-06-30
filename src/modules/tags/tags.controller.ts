import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { JwtAccessGuard, Roles, RolesGuard, TagsInterceptor } from 'src/common';
import { Prisma, Role, Tag } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tags')
@ApiUnauthorizedResponse({
  description: 'Access token required',
})
@ApiInternalServerErrorResponse({
  description: 'An error occurred while executing the request on the server',
})
@UseGuards(JwtAccessGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ summary: 'Get a list of tags' })
  @ApiOkResponse({ description: 'Data received successfully' })
  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }

  @ApiOperation({ summary: 'Get a specific tag' })
  @ApiOkResponse({ description: 'Data received successfully' })
  @ApiParam({ name: 'id', description: 'Enter tag id' })
  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTag(id);
  }

  @ApiOperation({ summary: 'Create new tag' })
  @ApiCreatedResponse({ description: 'Tag has been created' })
  @ApiConflictResponse({
    description: 'Check data that you have entered for uniqueness',
  })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Post('create')
  createTag(@Body() dto: CreateTagDto): Promise<Tag> {
    return this.tagsService.createTag(dto);
  }

  @ApiOperation({ summary: 'Update tag name' })
  @ApiOkResponse({ description: 'Tag has been updated' })
  @ApiNotFoundResponse({ description: 'Tag was not found' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
  @ApiParam({ name: 'id', description: 'Enter tag id' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Put('update/:id')
  updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ): Promise<Prisma.BatchPayload> {
    return this.tagsService.updateTag(dto, id);
  }

  @ApiOperation({ summary: 'Delete tag' })
  @ApiNoContentResponse({ description: 'Tag has been deleted' })
  @ApiNotFoundResponse({ description: 'Tag was not found' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to perform this action',
  })
  @ApiParam({ name: 'id', description: 'Enter tag id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Delete('delete/:id')
  deleteTag(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prisma.BatchPayload> {
    return this.tagsService.deleteTag(id);
  }
}
