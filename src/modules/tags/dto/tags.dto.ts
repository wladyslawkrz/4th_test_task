import { Tag } from '@prisma/client';

export class TagsDto {
  tagName: string;

  constructor(tag: Tag) {
    this.tagName = tag.tagName;
  }
}
