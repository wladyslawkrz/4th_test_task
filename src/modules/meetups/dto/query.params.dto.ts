import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDirections } from 'src/common/enum';

export class QueryParamsDto {
  @IsString()
  @IsOptional()
  meetup?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timefrom?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timeto?: Date;

  @IsOptional()
  @IsEnum(SortDirections)
  sort?: SortDirections;
}
