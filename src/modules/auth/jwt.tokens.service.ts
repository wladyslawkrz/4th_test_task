import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role } from '@prisma/client';
import * as argon from 'argon2';
import { Response } from 'express';
import { Tokens } from 'src/common/types';
import { AuthRepository } from './repository';

@Injectable()
export class JwtTokensService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private authRepository: AuthRepository,
  ) {}
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

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<Prisma.BatchPayload> {
    const hash = await argon.hash(refreshToken);
    return await this.authRepository.updateRefreshToken(userId, hash);
  }

  sendAccessTokenWithCookies(response: Response, access_token: string): void {
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
    });
  }

  sendRefreshTokenWithCookies(response: Response, refresh_token: string): void {
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
  ): Promise<void> {
    const tokens = await this.getBothTokens(userId, email, role);
    await this.updateRefreshTokenHash(userId, tokens.refresh_token);

    this.sendAccessTokenWithCookies(response, tokens.access_token);
    this.sendRefreshTokenWithCookies(response, tokens.refresh_token);
  }
}
