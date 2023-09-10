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
import { JwtRefreshGuard, GetUser, GetUserId } from 'src/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiInternalServerErrorResponse({
  description: 'An error occurred while executing the request on the server',
})
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiCreatedResponse({
    description: 'The account has been successfully created',
  })
  @ApiConflictResponse({
    description: 'Credentials that you entered are not unique',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Body() dto: AuthSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.signUp(dto, response);
  }

  @ApiOperation({ summary: 'User authorization' })
  @ApiOkResponse({ description: 'Logged in successfully' })
  @ApiForbiddenResponse({ description: 'Given credentials are incorrect' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() dto: AuthSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.signIn(dto, response);
  }

  @ApiOperation({ summary: 'End session' })
  @ApiOkResponse({ description: 'Logged out successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token required',
  })
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @GetUser('sub') userId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Prisma.BatchPayload> {
    return await this.authService.logout(userId, response);
  }

  @ApiOperation({ summary: 'Get new pair of tokens using RefreshToken' })
  @ApiUnauthorizedResponse({ description: 'Refresh token required' })
  @ApiForbiddenResponse({ description: 'Invalid refresh token, access denied' })
  @ApiNoContentResponse({ description: 'Refreshed tokens successfully' })
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('refresh')
  async refreshTokens(
    @GetUserId() userId: number,
    @GetUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.refreshTokens(userId, refreshToken, response);
  }
}
