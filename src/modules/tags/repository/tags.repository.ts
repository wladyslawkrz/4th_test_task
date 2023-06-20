import { Tag } from '@prisma/client';
import { ITagsRepository } from './tags.repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsRepository implements ITagsRepository {
  constructor(private prisma: PrismaService) {}

  async createTag(name: string): Promise<void> {
    await this.prisma.tag.create({
      data: {
        tagName: name,
      },
    });
  }

  async getAllTags(): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany();

    return tags;
  }

  async getOneTag(tagId: number): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    return tag;
  }

  async updateTag(name: string, tagId: number): Promise<void> {
    await this.prisma.tag.update({
      data: { tagName: name },
      where: {
        id: tagId,
      },
    });
  }

  async deleteTag(tagId: number): Promise<void> {
    await this.prisma.tag.delete({ where: { id: tagId } });
  }
}
