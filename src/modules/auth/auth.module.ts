import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository';
import { APP_FILTER } from '@nestjs/core';
import {
  AccessTokenStrategy,
  PrismaExceptionFilter,
  RefreshTokenStrategy,
} from 'src/common';
import { JwtTokensService } from './jwt.tokens.service';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthRepository,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AuthModule {}
