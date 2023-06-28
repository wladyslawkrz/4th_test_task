import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @Length(2, 15)
  @Matches(/^#/)
  tagName: string;
}
