import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  MeetupsModule,
  PlacesModule,
  TagsModule,
  UsersModule,
} from './modules';
import { PrismaModule } from './modules/prisma/prisma.module';
import { appConfigValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.${process.env.NODE_ENV}.env`,
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
