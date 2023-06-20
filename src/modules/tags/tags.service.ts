import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto, TagsDto, UpdateTagDto } from './dto';
import { TagsRepository } from './repository';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getAll() {
    const tags = await this.tagsRepository.getAllTags();

    return tags.map((tag) => new TagsDto(tag));
  }

  async getTag(id: number) {
    const tag = await this.tagsRepository.getOneTag(Number(id));
    if (!tag) return new NotFoundException('This tag was not found');

    return new TagsDto(tag);
  }

  async createTag(dto: CreateTagDto) {
    await this.tagsRepository.createTag(dto.tagName);
  }

  async updateTag(dto: UpdateTagDto, id: number) {
    const tag = await this.tagsRepository.getOneTag(Number(id));
    if (!tag) return new NotFoundException('This tag was not found');

    await this.tagsRepository.updateTag(dto.tagName, Number(id));
  }

  async deleteTag(id: number) {
    await this.tagsRepository.deleteTag(Number(id));
  }
}
