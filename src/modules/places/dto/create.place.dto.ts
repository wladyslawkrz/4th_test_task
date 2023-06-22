import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty()
  @IsString()
  @Length(1, 20)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(1, 40)
  street: string;

  @ApiProperty()
  @IsString()
  @Length(1, 15)
  building: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
