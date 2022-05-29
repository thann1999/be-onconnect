import { CreateUserResponse } from '../../api/leeon.api';

export interface RegisterFreeBody {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  companyRegion: string;
  switchboardName: string;
  packageId: string;
  language: string;
}

export interface RegisterFreeResponse {
  registerStatus: string;
  user: CreateUserResponse | null;
}
