import { Prisma, Tag } from '@prisma/client';

export interface ITagsRepository {
  createTag(name: string): Promise<Tag>;
  getAllTags(): Promise<Tag[]>;
  getOneTag(tagId: number): Promise<Tag>;
  updateTag(name: string, id: number): Promise<Prisma.BatchPayload>;
  deleteTag(tagId: number): Promise<Prisma.BatchPayload>;
}
