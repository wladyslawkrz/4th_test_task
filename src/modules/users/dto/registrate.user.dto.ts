import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class RegistrateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  meetupId: number;
}
