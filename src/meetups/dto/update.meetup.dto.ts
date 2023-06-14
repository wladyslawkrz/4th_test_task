import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateMeetupDto {
  @IsString()
  @Length(5, 30)
  @IsOptional()
  meetupName: string;

  @IsString()
  @Length(0, 200)
  @IsOptional()
  meetupDescription?: string;

  @IsDateString()
  @IsOptional()
  meetingTime: Date;

  @IsNumber()
  @IsOptional()
  meetingPlaceId: number;
}
