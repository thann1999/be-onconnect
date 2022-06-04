import { Options } from 'sequelize/types';

const DB_CONFIG: Options = {
  host: 'localhost',
  username: 'root',
  password: 'root99',
  database: 'on_connect',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default DB_CONFIG;
