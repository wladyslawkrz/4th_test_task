import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { dbConfig } from './database.config';

export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async (configService: ConfigService) => {
    const sequelizeOptions = await dbConfig(configService);
    const sequelize = new Sequelize(sequelizeOptions);
    await sequelize.sync();
    return sequelize;
  },
};
