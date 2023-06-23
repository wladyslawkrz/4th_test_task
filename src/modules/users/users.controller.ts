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
  UseInterceptors,
} from '@nestjs/common';
import { GetUser, GetUserId } from 'src/common';
import { JwtAccessGuard } from 'src/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersInterceptor } from 'src/common/interceptors';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(UsersInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @UseInterceptors(UsersInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('current')
  getCurrentUser(@GetUserId() userId: number) {
    return this.usersService.getCurrentUser(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Put('current')
  updateCurrentUser(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.usersService.updateCurrentUser(user.id, dto);
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
    return this.usersService.deleteCurrentUser(user.id);
  }
}
