import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import * as argon from 'argon2';
import { Response } from 'express';
import { JwtTokensService } from './jwt.tokens.service';
import { AuthSignInDto } from './dto';
import { AuthRepository } from './repository';
import { AuthSignUpDto } from './dto/auth.signup.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private jwt: JwtTokensService,
    private authRepository: AuthRepository,
  ) {}

  async signUp(dto: AuthSignUpDto, response: Response) {
    const passwordHashed = await argon.hash(dto.password);

    const newUser = await this.authRepository.createUser(dto, passwordHashed);

    await this.jwt.getTokensAndSendThem(
      newUser.id,
      newUser.email,
      newUser.userRole,
      response,
    );
    this.logger.verbose(`New user registered: ${dto.email}`);
  }

  async signIn(dto: AuthSignInDto, response: Response) {
    const user = await this.authRepository.getUserByCredentials(dto.email);

    if (!user)
      throw new ForbiddenException('The given credentials are incorrect.');

    const passwordMatches = await argon.verify(
      user.passwordHashed,
      dto.password,
    );

    if (!passwordMatches)
      throw new ForbiddenException('The given credentials are incorrect.');

    await this.jwt.getTokensAndSendThem(
      user.id,
      user.email,
      user.userRole,
      response,
    );

    this.logger.verbose(`User logged in: ${dto.email}`);
  }

  async logout(userId: number, response: Response) {
    await this.authRepository.destroyRefreshToken(userId);

    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    this.logger.verbose(
      `User logged out: id ${userId}, access and refresh tokens destroyed.`,
    );
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
    response: Response,
  ) {
    const user = await this.authRepository.getUserById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await argon.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    await this.jwt.getTokensAndSendThem(
      user.id,
      user.email,
      user.userRole,
      response,
    );

    this.logger.verbose(
      `User: id ${userId} refreshed his access token using refresh token.`,
    );
  }
}
