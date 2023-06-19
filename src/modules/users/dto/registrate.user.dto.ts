import { IsNumber, IsPositive } from 'class-validator';

export class RegistrateUserDto {
  @IsNumber()
  @IsPositive()
  meetupId: number;
}
