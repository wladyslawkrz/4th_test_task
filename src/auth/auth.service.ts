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
import { Tokens } from './types/tokens.type';

@Injectable({})
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    const passwordHashed = await argon.hash(dto.password);

    try {
      const newUser = await models.User.create({
        email: dto.email,
        passwordHashed: passwordHashed,
        userRole: Role.regularUser,
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);

      return tokens;
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

    return this.getTokens(user.id, user.email);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
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
}
