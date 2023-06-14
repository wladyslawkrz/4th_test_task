import { Tag } from 'src/entities';

export class TagsDto {
  tagName: string;

  constructor(tag: Tag) {
    this.tagName = tag.tagName;
  }
}
