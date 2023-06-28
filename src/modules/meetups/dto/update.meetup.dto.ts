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
  @ApiPropertyOptional({ minLength: 5, maxLength: 30, default: 'React meetup' })
  @IsString()
  @Length(5, 30)
  @IsOptional()
  meetupName: string;

  @ApiPropertyOptional({
    maxLength: 200,
    default: 'Meetup related with ReactJS and frond-end',
  })
  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  meetingTime: Date;

  @ApiPropertyOptional({ type: 'number', default: 1 })
  @IsNumber()
  @IsOptional()
  meetingPlaceId: number;

  @ApiPropertyOptional({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tags: number[];
}
