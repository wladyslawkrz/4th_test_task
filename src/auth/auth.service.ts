import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import * as models from '../entities';

@Injectable({})
export class AuthService {
  async signUp(dto: AuthDto) {
    const passwordHashed = await argon.hash(dto.password);

    return 'registered';
  }
  async signIn(dto: AuthDto) {
    const user = await models.User.findOne({
      where: {
        email: dto.email,
      },
    });

    return user.toJSON();
  }
}
