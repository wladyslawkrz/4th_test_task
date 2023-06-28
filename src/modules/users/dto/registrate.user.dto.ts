import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class RegistrateUserDto {
  @ApiProperty({ type: 'number', minimum: 1 })
  @IsNumber()
  @IsPositive()
  meetupId: number;
}
