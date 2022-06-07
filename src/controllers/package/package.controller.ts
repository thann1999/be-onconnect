import { NextFunction, Request, Response } from 'express';
import { HttpResponse, HttpStatus } from '../../services/http/http.type';
import {
  CompareInfo,
  PackageInfo,
  PackageOption,
  UpgradePackageRequest,
} from '../../shared/types/package.type';
import PackageDao from '../../dao/package.dao';
import { ComparePackageList, PackageList, PackageOptionList } from './package.type';
import { sendMail, upgradePackageMail } from '../../services/send-email/email.service';
import { CommonMessage } from '../../shared/const/message.const';

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

  getOptionList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = (await PackageDao.getListPackageOption()) as PackageOption[];
      const response: HttpResponse<PackageOptionList> = {
        data: {
          optionList: result,
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

  upgradePackage = async (
    req: Request<{}, {}, UpgradePackageRequest>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await sendMail(upgradePackageMail(req.body))
        .then(() => {
          console.log(`Email sent: ${process.env.SALES_MAIL}`);
        })
        .catch(() => {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${CommonMessage.SEND_MAIL_FAIL} ${process.env.SALES_MAIL}`,
          });
        });
      const response: HttpResponse<{}> = {
        data: {
          message: CommonMessage.SUCCESS,
        },
        status: HttpStatus.SUCCESS,
      };
      res.status(response.status).json({ message: response.data.message });
    } catch (error) {
      next(error);
    }
  };
}

const instance = new PackageController();
export default instance;
