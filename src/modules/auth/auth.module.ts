import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/common/jwt';
import { authProviders } from './auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokensService } from './jwt.tokens.service';

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
