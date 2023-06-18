import { Tag } from 'src/database/entities';

export class TagsDto {
  tagName: string;

  constructor(tag: Tag) {
    this.tagName = tag.tagName;
  }
}
