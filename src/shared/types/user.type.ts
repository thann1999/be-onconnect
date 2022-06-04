import { Request } from 'express';

/* eslint-disable no-unused-vars */
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface CustomRequestUser extends Request {
  user?: any;
}

export interface UserRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName?: string;
  companyRegion?: string;
  switchboardName: string;
  packageId: string;
  language: string;
}

export interface UserInfo extends UserRequestBody {
  leeonUserId: number;
  orgUnitId: number;
  leeonPassword: string;
  password: string;
  role: string;
}
