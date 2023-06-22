import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PostMeetupDto {
  @ApiProperty()
  @IsString()
  @Length(5, 30)
  meetupName: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription?: string;

  @ApiProperty()
  @IsDateString()
  meetingTime: Date;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  meetingPlaceId: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags: number[];
}
