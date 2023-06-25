import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as argon from 'argon2';
import { Response } from 'express';
import { JwtPayload, Tokens } from 'src/common/types';
import { AuthRepository } from './repository';

@Injectable()
export class JwtTokensService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private authRepository: AuthRepository,
  ) {}

  async validateToken(payload: JwtPayload) {
    const user = await this.authRepository.getUserById(payload.sub);
    if (!user) throw new UnauthorizedException();

    return payload;
  }

  async getBothTokens(
    userId: number,
    email: string,
    role: Role,
  ): Promise<Tokens> {
    const [access, refresh] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get('JWT_SECRET_KEY'),
          expiresIn: '30m',
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get('JWT_REFRESH_KEY'),
          expiresIn: '1w',
        },
      ),
    ]);

    return {
      access_token: access,
      refresh_token: refresh,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.authRepository.updateRefreshToken(userId, hash);
  }

  sendAccessTokenWithCookies(response: Response, access_token: string) {
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
    });
  }

  sendRefreshTokenWithCookies(response: Response, refresh_token: string) {
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
    });
  }

  async getTokensAndSendThem(
    userId: number,
    email: string,
    role: Role,
    response: Response,
  ) {
    const tokens = await this.getBothTokens(userId, email, role);
    await this.updateRefreshTokenHash(userId, tokens.refresh_token);

    this.sendAccessTokenWithCookies(response, tokens.access_token);
    this.sendRefreshTokenWithCookies(response, tokens.refresh_token);
  }
}
