import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  MeetupsModule,
  PlacesModule,
  TagsModule,
  UsersModule,
} from './modules';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UsersModule,
    MeetupsModule,
    AuthModule,
    TagsModule,
    PlacesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
