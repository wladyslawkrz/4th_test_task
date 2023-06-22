import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateMeetupDto {
  @ApiPropertyOptional()
  @IsString()
  @Length(5, 30)
  @IsOptional()
  meetupName: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
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
