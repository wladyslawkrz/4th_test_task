import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({ default: 'your-email@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'your-strong-pass' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
