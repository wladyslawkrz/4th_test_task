import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/common';
import { UsersRepository } from './repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SerializeInterceptor],
})
export class UsersModule {}
