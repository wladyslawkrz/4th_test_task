import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from 'src/entities';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_KEY'),
      passReqToCallBack: true,
    });
  }

  async validate(req: Request, payload: { sub: number; email: string }) {
    const user = await User.findOne({
      where: {
        id: payload.sub,
      },
    });

    const returnedUser = user.toJSON();
    delete returnedUser.passwordHashed;

    return returnedUser;
  }
}
