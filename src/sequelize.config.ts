import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as models from './entities/index';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'meetups-api-db-do-user-14240977-0.b.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'AVNS_siVuHwn8t2aCCMpfkz4',
  database: 'meetup',
  models: Object.values(models),
  autoLoadModels: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
