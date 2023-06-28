import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto';
import { TagsRepository } from './repository';
import { Prisma, Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  private logger = new Logger('TagsService');

  constructor(private tagsRepository: TagsRepository) {}

  async getAll(): Promise<Tag[]> {
    const tags = await this.tagsRepository.getAllTags();

    this.logger.verbose(
      `Request for a list of meetups. User got ${tags.length} rows.`,
    );

    return tags;
  }

  async getTag(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.getOneTag(id);
    if (!tag) throw new NotFoundException('This tag was not found');

    this.logger.verbose(`Request for tag [id ${id}]`);

    return tag;
  }

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const creationResult = await this.tagsRepository.createTag(dto.tagName);

    this.logger.verbose(`Created tag: ${dto.tagName}`);

    return creationResult;
  }

  async updateTag(dto: UpdateTagDto, id: number): Promise<Prisma.BatchPayload> {
    const tag = await this.tagsRepository.getOneTag(id);
    if (!tag) throw new NotFoundException('This tag was not found');

    const updateResult = await this.tagsRepository.updateTag(dto.tagName, id);

    this.logger.verbose(`Tag [id ${id}] was updated.`);

    return updateResult;
  }

  async deleteTag(id: number): Promise<Prisma.BatchPayload> {
    const deletionResult = await this.tagsRepository.deleteTag(id);

    this.logger.verbose(`Tag [id ${id}] was deleted.`);

    return deletionResult;
  }
}
