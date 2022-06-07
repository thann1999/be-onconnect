/* eslint-disable no-unused-vars */
import { Profile, UserInfo } from '../../shared/types/user.type';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  companyRegion: string;
  switchboardName?: string;
  packageId?: number;
  language: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UserModelInfo extends UserInfo {
  id: number;
  createdAt: string;
}

export interface UserResponse extends UserRequestBody {
  id: number;
  createdAt: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserResponse | null;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface UserListResponse {
  userList: Profile[];
}

export interface WarningExpiredDateRequest {
  userId: number;
}
