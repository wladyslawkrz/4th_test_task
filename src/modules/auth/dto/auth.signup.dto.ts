import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ default: 'john-doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'myVeryStrongPassword' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ default: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ default: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;
}
