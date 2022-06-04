import httpService from '../services/http/http.service';

interface OrgUnitParams {
  type: string;
  name: string;
  id?: number;
  description: string;
  parentId: number;
}

interface OrgUnits {
  status: boolean;
  data: OrgUnitParams;
}

interface OUPBXInfo {
  status: string;
  data: {
    orgUnits: OrgUnitParams[];
  };
}

interface CreateUnitParams {
  orgUnitId: number;
  value: string;
}

interface CreateUnitResponse extends CreateUnitParams {
  id: number;
  name: string;
}

interface CreateUserParams {
  fullName: string;
  password: string;
  email: string;
  language: string;
  orgUnitId: number;
}

interface DataUserResponse extends CreateUserParams {
  id: number;
  pinFails: number;
  pinBlocked: number;
  passwordFails: number;
  passwordBlocked: number;
  sendEmailVoicemail: boolean;
  expertMode: boolean;
}

export interface CreateUserResponse {
  status: boolean;
  data: DataUserResponse;
}

interface SetRoleuser {
  userId: string;
  orgUnitId: number;
}

export default class LeeonAPI {
  static getOUPBXInfo = () => {
    const name = 'Leeon';
    return httpService.get<OUPBXInfo>(`/rest/orgUnits?where=name.eq('${name}')`);
  };

  static createPBX = (params: OrgUnitParams) => {
    return httpService.post<OrgUnits>('/rest/orgUnits', {
      body: params,
    });
  };

  static setMaxExtensions = (params: CreateUnitParams) => {
    const name = 'maxExtensions';
    return httpService.post<CreateUnitResponse>('/rest/orgUnitAttributes', {
      body: {
        ...params,
        name,
      },
    });
  };

  static createUser = (params: CreateUserParams) => {
    return httpService.post<CreateUserResponse>('/rest/users', {
      body: params,
    });
  };

  static setRoleUser = (params: SetRoleuser) => {
    const role = 'pbx';
    return httpService.post('/rest/userRoles', {
      body: {
        ...params,
        role,
      },
    });
  };
}
