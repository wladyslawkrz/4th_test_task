import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePlaceDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Length(1, 20)
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Length(1, 40)
  street: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Length(1, 15)
  building: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
