import { Expose } from 'class-transformer';

export class TagsDto {
  @Expose()
  id: number;

  @Expose()
  tagName: string;
}
