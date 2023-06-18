import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Tokens } from './types';
import { Response } from 'express';
import { User } from 'src/entities';

@Injectable()
export class JwtTokensService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @Inject('UsersRepository') private readonly usersRepository: typeof User,
  ) {}

  async getBothTokens(userId: number, email: string): Promise<Tokens> {
    const [access, refresh] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
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
    await this.usersRepository.update(
      {
        refreshToken: hash,
      },
      {
        where: { id: userId },
      },
    );
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
    response: Response,
  ) {
    const tokens = await this.getBothTokens(userId, email);
    await this.updateRefreshTokenHash(userId, tokens.refresh_token);

    this.sendAccessTokenWithCookies(response, tokens.access_token);
    this.sendRefreshTokenWithCookies(response, tokens.refresh_token);
  }
}
