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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersInterceptor } from 'src/common/interceptors';
import { Prisma, User, UserOnMeetup } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Users')
@ApiUnauthorizedResponse({
  description: 'Access token required',
})
@ApiInternalServerErrorResponse({
  description: 'An error occurred while executing the request on the server',
})
@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ description: 'Data received successfully' })
  @UseInterceptors(UsersInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @ApiOkResponse({ description: 'Data received successfully' })
  @UseInterceptors(UsersInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('current')
  getCurrentUser(@GetUserId() userId: number): Promise<User> {
    return this.usersService.getCurrentUser(userId);
  }

  @ApiOkResponse({ description: 'User data has been updated' })
  @HttpCode(HttpStatus.OK)
  @Put('current')
  updateCurrentUser(
    @GetUserId() userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<Prisma.BatchPayload> {
    return this.usersService.updateCurrentUser(userId, dto);
  }

  @ApiCreatedResponse({
    description: 'User has been registraten on the meetup',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('registrate')
  registrateCurrentUserOnMeetup(
    @GetUserId() userId: number,
    @Body() dto: RegistrateUserDto,
  ): Promise<UserOnMeetup> {
    return this.usersService.registrateUserOnMeetup(userId, dto);
  }
}
