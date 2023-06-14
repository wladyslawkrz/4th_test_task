import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @Length(1, 20)
  city: string;

  @IsString()
  @Length(1, 40)
  street: string;

  @IsString()
  @Length(1, 15)
  building: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
