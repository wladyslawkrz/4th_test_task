import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  MeetupsModule,
  PlacesModule,
  PrismaModule,
  TagsModule,
  UsersModule,
} from './modules';
import { appConfigValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: appConfigValidationSchema,
    }),
    UsersModule,
    MeetupsModule,
    AuthModule,
    TagsModule,
    PlacesModule,
    PrismaModule,
  ],
})
export class AppModule {}
