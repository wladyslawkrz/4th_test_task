import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ minLength: 1, maxLength: 20, default: 'Mahilyow' })
  @IsString()
  @Length(1, 20)
  city: string;

  @ApiProperty({ minLength: 1, maxLength: 40, default: 'Leninskaja' })
  @IsString()
  @Length(1, 40)
  street: string;

  @ApiProperty({ minLength: 1, maxLength: 15, default: '123B' })
  @IsString()
  @Length(1, 15)
  building: string;

  @ApiPropertyOptional({ type: 'number', minimum: 1, default: 101 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  room: number;
}
