import { UserInfo, UserRequestBody } from '../../shared/types/user.type';

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
  createdDate: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserResponse | null;
}
