import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePlaceDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 20, default: 'Mahilyow' })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  city: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 40, default: 'Leninskaja' })
  @IsString()
  @IsOptional()
  @Length(1, 40)
  street: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 15, default: '123B' })
  @IsString()
  @IsOptional()
  @Length(1, 15)
  building: string;

  @ApiPropertyOptional({ type: 'number', minimum: 1, default: 101 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
