import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ minLength: 2, maxLength: 15, default: '#tagName' })
  @IsString()
  @Length(2, 15)
  @Matches(/^#/)
  tagName: string;
}
