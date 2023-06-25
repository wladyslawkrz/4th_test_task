import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto';
import { TagsRepository } from './repository';

@Injectable()
export class TagsService {
  private logger = new Logger('TagsService');

  constructor(private tagsRepository: TagsRepository) {}

  async getAll() {
    try {
      const tags = await this.tagsRepository.getAllTags();

      this.logger.verbose(
        `Request for a list of meetups. User got ${tags.length} rows.`,
      );

      return tags;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async getTag(id: number) {
    try {
      const tag = await this.tagsRepository.getOneTag(Number(id));
      if (!tag) throw new NotFoundException('This tag was not found');

      this.logger.verbose(`Request for tag [id ${id}]`);

      return tag;
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async createTag(dto: CreateTagDto) {
    try {
      await this.tagsRepository.createTag(dto.tagName);

      this.logger.verbose(`Created tag: ${dto.tagName}`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async updateTag(dto: UpdateTagDto, id: number) {
    try {
      const tag = await this.tagsRepository.getOneTag(Number(id));
      if (!tag) throw new NotFoundException('This tag was not found');

      await this.tagsRepository.updateTag(dto.tagName, Number(id));

      this.logger.verbose(`Tag [id ${id}] was updated.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }

  async deleteTag(id: number) {
    try {
      await this.tagsRepository.deleteTag(Number(id));

      this.logger.verbose(`Tag [id ${id}] was deleted.`);
    } catch (error) {
      this.logger.error(error);

      return error;
    }
  }
}
