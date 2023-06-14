import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MeetupsModule } from './meetups/meetups.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { PlacesModule } from './places/places.module';
import { sequelizeConfig } from './sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    MeetupsModule,
    AuthModule,
    TagsModule,
    PlacesModule,
  ],
})
export class AppModule {}
