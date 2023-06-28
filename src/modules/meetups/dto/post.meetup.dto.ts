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
  @ApiProperty({ minLength: 5, maxLength: 30, default: 'React meetup' })
  @IsString()
  @Length(5, 30)
  meetupName: string;

  @ApiPropertyOptional({
    maxLength: 200,
    default: 'Meetup related with ReactJS and frond-end',
  })
  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription?: string;

  @ApiProperty()
  @IsDateString()
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
