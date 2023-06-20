import { Tag } from '@prisma/client';

export interface ITagsRepository {
  createTag(name: string): Promise<void>;
  getAllTags(): Promise<Tag[]>;
  getOneTag(tagId: number): Promise<Tag>;
  updateTag(name: string, id: number): Promise<void>;
  deleteTag(tagId: number): Promise<void>;
}
