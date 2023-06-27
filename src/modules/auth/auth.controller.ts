import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  JwtAccessGuard,
  JwtRefreshGuard,
  GetUser,
  GetUserId,
} from 'src/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(
    @Body() dto: AuthSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.signUp(dto, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(
    @Body() dto: AuthSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.signIn(dto, response);
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(
    @GetUserId() userId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Prisma.BatchPayload> {
    return this.authService.logout(userId, response);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @GetUserId() userId: number,
    @GetUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.refreshTokens(userId, refreshToken, response);
  }
}
