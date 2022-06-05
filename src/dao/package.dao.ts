import BaseDao from './base.dao';
import { Optional } from 'sequelize/types';
import { CompareInfo, PackageInfo } from '../shared/types/package.type';
import PackageModel from '../models/package.model';
import ComparePackageModel from '../models/compare-package.model';

class PackageDao extends BaseDao {
  insertManyPackage(data: Optional<PackageInfo, 'id'>[]) {
    return super.insertMany(PackageModel, data);
  }

  insertManyCompare(data: Optional<CompareInfo, 'id'>[]) {
    return super.insertMany(ComparePackageModel, data);
  }

  getListAllPackage() {
    return super.findAll(PackageModel);
  }

  getListCompare() {
    return super.findAll(ComparePackageModel);
  }
}

const instance = new PackageDao();
export default instance;
