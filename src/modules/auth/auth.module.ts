import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/common/jwt';
import {
  AuthController,
  AuthService,
  JwtTokensService,
  authProviders,
} from '.';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...authProviders,
  ],
})
export class AuthModule {}
