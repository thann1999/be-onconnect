import { UserRequestBody } from '../../controllers/regsiter-free/authentication.type';
import { Request } from 'express';
import { PackageInfo } from './package.type';

export interface CustomRequestUser extends Request {
  user?: any;
}

export interface UserInfo extends UserRequestBody {
  id?: number;
  leeonUserId?: number;
  orgUnitId?: number;
  leeonPassword?: string;
  password: string;
  role: string;
}

export interface Profile extends UserInfo {
  Package: PackageInfo;
}
