import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.jwtExtractFromCookie,
      ]),
      secretOrKey: config.get<string>('JWT_REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  private static jwtExtractFromCookie(req: Request): string | null {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token;
    }

    return null;
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken === null)
      throw new ForbiddenException('Refresh token required');

    return { ...payload, refreshToken };
  }
}
