import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDirections } from 'src/common/enum';

export class QueryParamsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  meetup?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timefrom?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timeto?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(SortDirections)
  sort?: SortDirections;
}
