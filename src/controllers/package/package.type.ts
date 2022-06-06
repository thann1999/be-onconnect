import { CompareInfo, PackageInfo, PackageOption } from '../../shared/types/package.type';

export interface PackageList {
  packageList: PackageInfo[];
}

export interface ComparePackageList {
  compareList: CompareInfo[];
}

export interface PackageOptionList {
  optionList: PackageOption[];
}
