import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
