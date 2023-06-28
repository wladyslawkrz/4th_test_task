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
import { JwtAccessGuard, Roles, RolesGuard } from 'src/common';
import { Role } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TagsInterceptor } from 'src/common/interceptors';

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

  @ApiOkResponse({ description: 'Data received successfully' })
  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllTags() {
    return this.tagsService.getAll();
  }

  @ApiOkResponse({ description: 'Data received successfully' })
  @ApiParam({ name: 'id', description: 'Enter tag id' })
  @UseInterceptors(TagsInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTag(id);
  }
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
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

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
  updateTag(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateTag(dto, id);
  }

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
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
