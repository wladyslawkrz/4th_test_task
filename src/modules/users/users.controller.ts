import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser, GetUserId } from 'src/common';
import { User } from 'src/database/entities';
import { JwtAccessGuard } from 'src/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';

@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('current')
  getCurrentUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('current')
  updateCurrentUser(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user.id, dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registrate')
  registrateCurrentUserOnMeetup(
    @GetUserId() userId: number,
    @Body() dto: RegistrateUserDto,
  ) {
    return this.usersService.registrateUserOnMeetup(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('current')
  deleteCurrentUser(@GetUser() user: User) {
    return this.usersService.deleteMe(user.id);
  }
}
