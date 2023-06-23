import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersInterceptor } from 'src/common/interceptors';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersInterceptor],
})
export class UsersModule {}
