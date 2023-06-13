import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/entities/enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(Role)
  userRole?: Role;
}
