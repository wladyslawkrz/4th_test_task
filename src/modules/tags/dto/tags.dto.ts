import { Expose } from 'class-transformer';

export class TagsDto {
  @Expose()
  tagName: string;
}
