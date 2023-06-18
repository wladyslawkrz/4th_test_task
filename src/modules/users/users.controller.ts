import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/common';
import { User } from 'src/entities';
import { JwtAccessGuard } from 'src/common';
import { UsersService, UpdateUserDto } from '.';

@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Put('me')
  updateMe(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user.id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  deleteMe(@GetUser() user: User) {
    return this.usersService.deleteMe(user.id);
  }
}