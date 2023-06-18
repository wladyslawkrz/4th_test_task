import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PostMeetupDto {
  @IsString()
  @Length(5, 30)
  meetupName: string;

  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription?: string;

  @IsDateString()
  meetingTime: Date;

  @IsNumber()
  @IsOptional()
  meetingPlaceId: number;
}
