import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import * as models from '../entities';
import { Role } from 'src/entities/enum';
import { UniqueConstraintError } from 'sequelize';

@Injectable({})
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  async signUp(dto: AuthDto) {
    const passwordHashed = await argon.hash(dto.password);

    try {
      await models.User.create({
        email: dto.email,
        passwordHashed: passwordHashed,
        userRole: Role.regularUser,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new HttpException(
          'Email is already in use.',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async signIn(dto: AuthDto) {
    const user = await models.User.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ForbiddenException('The given credentials are incorrect.');

    const passwordMatches = await argon.verify(
      user.passwordHashed,
      dto.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException('The given credentials are incorrect.');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET_KEY');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
