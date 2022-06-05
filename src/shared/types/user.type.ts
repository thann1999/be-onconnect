import { UserRequestBody } from '../../controllers/regsiter-free/authentication.type';
import { Request } from 'express';

export interface CustomRequestUser extends Request {
  user?: any;
}

export interface UserInfo extends UserRequestBody {
  id?: number;
  leeonUserId: number;
  orgUnitId: number;
  leeonPassword: string;
  password: string;
  role: string;
}
