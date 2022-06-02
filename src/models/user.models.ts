import sequelize from '../database/db-connection';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  packageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leeonUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orgUnitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  companyName: DataTypes.STRING,
  companyRegion: DataTypes.STRING,
  leeonPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  switchboardName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserModel;
