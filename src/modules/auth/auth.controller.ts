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
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The account has been successfully created',
  })
  @ApiConflictResponse({
    description: 'Credentials that you entered are not unique',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while executing the request on the server',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(
    @Body() dto: AuthSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.signUp(dto, response);
  }

  @ApiOkResponse({ description: 'Logged in successfully' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while executing the request on the server',
  })
  @ApiForbiddenResponse({ description: 'Given credentials are incorrect' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(
    @Body() dto: AuthSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.signIn(dto, response);
  }

  @ApiOkResponse({ description: 'Logged out successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token required',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while executing the request on the server',
  })
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(
    @GetUserId() userId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Prisma.BatchPayload> {
    return this.authService.logout(userId, response);
  }

  @ApiUnauthorizedResponse({ description: 'Refresh token required' })
  @ApiForbiddenResponse({ description: 'Invalid refresh token, access denied' })
  @ApiNoContentResponse({ description: 'Refreshed tokens successfully' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while executing the request on the server',
  })
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('refresh')
  refreshTokens(
    @GetUserId() userId: number,
    @GetUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.refreshTokens(userId, refreshToken, response);
  }
}
