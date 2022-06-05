import sequelize from '../database/db-connection';
import { DataTypes } from 'sequelize';
import CompareModel from './compare-package.model';

const PackageModel = sequelize.define(
  'Package',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthlyPricing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yearlyPricing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    channels: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Packages',
  }
);

PackageModel.hasOne(CompareModel, { foreignKey: 'packageId' });

export default PackageModel;
