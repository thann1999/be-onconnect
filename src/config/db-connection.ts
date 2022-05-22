import DB_CONFIG from './db-config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: DB_CONFIG.database,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  host: DB_CONFIG.host,
  dialect: DB_CONFIG.dialect,
  pool: {
    max: DB_CONFIG.pool?.max,
    min: DB_CONFIG.pool?.min,
    acquire: DB_CONFIG.pool?.acquire,
    idle: DB_CONFIG.pool?.idle,
  },
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
