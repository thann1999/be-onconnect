import { CompareInfo, PackageInfo } from '../../shared/types/package.type';

export interface PackageList {
  packageList: PackageInfo[];
}

export interface ComparePackageList {
  compareList: CompareInfo[];
}
