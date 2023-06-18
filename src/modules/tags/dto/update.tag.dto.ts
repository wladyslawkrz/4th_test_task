import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @Length(2, 15)
  @Matches(/^#/)
  @IsOptional()
  tagName: string;
}
