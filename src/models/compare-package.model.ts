import sequelize from '../database/db-connection';
import { DataTypes } from 'sequelize';

const PackageModel = sequelize.define(
  'Compare',
  {
    isWebsiteLiveChat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isChatCallLink: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isChatCallQR: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isWhatsApp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLocalNumber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isTollFreeNumber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    inboundOutbound: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isDynamicSMS: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'Compares',
  }
);

export default PackageModel;
