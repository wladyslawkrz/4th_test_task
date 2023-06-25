import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersInterceptor } from 'src/common/interceptors';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from 'src/common';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersInterceptor,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class UsersModule {}
