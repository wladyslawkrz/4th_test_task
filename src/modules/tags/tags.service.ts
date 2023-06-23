import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto';
import { TagsRepository } from './repository';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getAll() {
    const tags = await this.tagsRepository.getAllTags();

    return tags;
  }

  async getTag(id: number) {
    const tag = await this.tagsRepository.getOneTag(Number(id));
    if (!tag) throw new NotFoundException('This tag was not found');

    return tag;
  }

  async createTag(dto: CreateTagDto) {
    await this.tagsRepository.createTag(dto.tagName);
  }

  async updateTag(dto: UpdateTagDto, id: number) {
    const tag = await this.tagsRepository.getOneTag(Number(id));
    if (!tag) throw new NotFoundException('This tag was not found');

    await this.tagsRepository.updateTag(dto.tagName, Number(id));
  }

  async deleteTag(id: number) {
    await this.tagsRepository.deleteTag(Number(id));
  }
}
