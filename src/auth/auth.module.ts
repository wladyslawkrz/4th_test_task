import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/auth/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtTokensService } from './jwt.tokens.service';
import { authProviders } from './auth.provider';

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
