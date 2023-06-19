import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { Op } from 'sequelize';
import { Response } from 'express';
import { Role } from 'src/common/enum';
import { User } from 'src/database/entities';
import { JwtTokensService } from './jwt.tokens.service';
import { UsersRepository } from './auth.provider';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtTokensService,
    @Inject(UsersRepository) private readonly usersRepository: typeof User,
  ) {}

  async signUp(dto: AuthDto, response: Response) {
    const passwordHashed = await argon.hash(dto.password);

    const newUser = await this.usersRepository.create({
      email: dto.email,
      passwordHashed: passwordHashed,
      userRole: Role.regularUser,
    });

    await this.jwt.getTokensAndSendThem(newUser.id, newUser.email, response);
  }

  async signIn(dto: AuthDto, response: Response) {
    const user = await this.usersRepository.findOne({
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

    await this.jwt.getTokensAndSendThem(user.id, user.email, response);
  }

  async logout(userId: number, response: Response) {
    await this.usersRepository.update(
      { refreshToken: null },
      {
        where: {
          id: userId,
          refreshToken: { [Op.ne]: null },
        },
      },
    );

    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
    response: Response,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await argon.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    await this.jwt.getTokensAndSendThem(user.id, user.email, response);
  }
}
