import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePlaceDto {
  @IsString()
  @IsOptional()
  @Length(1, 20)
  city: string;

  @IsString()
  @IsOptional()
  @Length(1, 40)
  street: string;

  @IsString()
  @IsOptional()
  @Length(1, 15)
  building: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
