import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter, UsersInterceptor } from 'src/common';
import { UsersRepository } from './repository';

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
