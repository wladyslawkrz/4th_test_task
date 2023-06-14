import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as models from './entities/index';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  models: Object.values(models),
  autoLoadModels: true,
};
