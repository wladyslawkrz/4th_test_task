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
import { GetUser } from 'src/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/guard';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
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
  updateMe() {
    return 'updated';
  }

  @Delete('me')
  deleteMe() {
    return 'deleted';
  }
}
