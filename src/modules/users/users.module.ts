import { Module } from '@nestjs/common';
import { UsersController, UsersService, usersProviders } from '.';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
