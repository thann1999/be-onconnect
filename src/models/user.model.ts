import sequelize from '../database/db-connection';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define(
  'User',
  {
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
    leeonUserId: DataTypes.INTEGER,
    orgUnitId: DataTypes.INTEGER,
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyRegion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leeonPassword: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    switchboardName: DataTypes.STRING,
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
  }
);

export default UserModel;
