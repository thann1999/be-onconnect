import { NextFunction, Request, Response } from 'express';
import { HttpResponse, HttpStatus } from '../../services/http/http.type';
import { CompareInfo, PackageInfo } from '../../shared/types/package.type';
import PackageDao from '../../dao/package.dao';
import { ComparePackageList, PackageList } from './package.type';

class PackageController {
  getListAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = (await PackageDao.getListAllPackage()) as PackageInfo[];
      const response: HttpResponse<PackageList> = {
        data: {
          packageList: result,
        },
        status: HttpStatus.SUCCESS,
      };
      res.status(response.status).json(response.data);
    } catch (error) {
      next(error);
    }
  };

  getListCompare = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = (await PackageDao.getListCompare()) as CompareInfo[];
      const response: HttpResponse<ComparePackageList> = {
        data: {
          compareList: result,
        },
        status: HttpStatus.SUCCESS,
      };
      res.status(response.status).json(response.data);
    } catch (error) {
      next(error);
    }
  };
}

const instance = new PackageController();
export default instance;
