import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ default: 'FirstName' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ default: 'LastName' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role)
  userRole?: Role;
}
