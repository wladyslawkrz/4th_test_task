import { IsString, Length, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Length(2, 15)
  @Matches(/^#/)
  tagName: string;
}
