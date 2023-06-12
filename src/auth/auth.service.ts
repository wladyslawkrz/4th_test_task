import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import * as models from '../entities';
import { Role } from 'src/entities/enum';
import { UniqueConstraintError } from 'sequelize';

@Injectable({})
export class AuthService {
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
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    }
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
