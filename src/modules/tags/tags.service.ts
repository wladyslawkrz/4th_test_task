import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/database/entities';
import { CreateTagDto, TagsDto, UpdateTagDto } from './dto';
import { TagsRepository } from './tags.provider';

@Injectable()
export class TagsService {
  constructor(@Inject(TagsRepository) readonly tagsRepository: typeof Tag) {}

  async getAll() {
    const tags = await this.tagsRepository.findAll<Tag>();

    return tags.map((tag) => new TagsDto(tag));
  }

  async getTag(id: number) {
    const tag = await this.tagsRepository.findByPk(id);
    if (!tag) return new NotFoundException();

    return new TagsDto(tag);
  }

  async createTag(dto: CreateTagDto) {
    const tag = new Tag();

    tag.tagName = dto.tagName;

    await tag.save();
  }

  async updateTag(dto: UpdateTagDto, id: number) {
    const tag = await this.tagsRepository.findByPk(id);
    if (!tag) return new NotFoundException('This tag was not found');

    tag.tagName = dto.tagName || tag.tagName;
    tag.save();

    return tag;
  }

  async deleteTag(id: number) {
    const tag = await this.tagsRepository.findByPk(id);

    tag.destroy();
  }
}
