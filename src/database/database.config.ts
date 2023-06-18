import { ConfigService } from '@nestjs/config';
import * as models from './entities';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dbConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    models: Object.values(models),
    autoLoadModels: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
};
