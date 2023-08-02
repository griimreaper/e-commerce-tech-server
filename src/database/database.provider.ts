import { Sequelize } from 'sequelize-typescript';
import { Products } from 'src/products/products.entity';
import { Users } from 'src/users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: false,
        native: false,
      });
      sequelize.addModels([Users, Products]);
      try {
        await sequelize.sync({ force: true });
      } catch (error) {
        console.error('SEQUALIZE SYNC ERROR: ', error);
      }
      return sequelize;
    },
  },
];

//
