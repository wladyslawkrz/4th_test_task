import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUserId } from 'src/common';
import { JwtAccessGuard } from 'src/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { RegistrateUserDto } from './dto/registrate.user.dto';
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
  updateCurrentUser(@GetUserId() userId: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateCurrentUser(userId, dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registrate')
  registrateCurrentUserOnMeetup(
    @GetUserId() userId: number,
    @Body() dto: RegistrateUserDto,
  ) {
    return this.usersService.registrateUserOnMeetup(userId, dto);
  }
}
