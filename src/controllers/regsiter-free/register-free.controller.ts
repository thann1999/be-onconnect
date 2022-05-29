import { NextFunction, Request, Response } from 'express';
import { validationHandleError } from '../../services/validation/validation-handle-error';
import { ErrorDataLeeonAPI, HttpResponse, HttpStatus } from '../../services/http/http.type';
import { RegisterFreeBody, RegisterFreeResponse } from './register-free.type';
import LeeonAPI from '../../api/leeon.api';
import generator from 'generate-password';

class RegisterFree {
  async register(req: Request<{}, {}, RegisterFreeBody>, res: Response, next: NextFunction) {
    const validationErrors = validationHandleError(req);
    if (validationErrors.errors) {
      return res.status(HttpStatus.BAD_REQUEST).json(validationErrors);
    }

    try {
      const {
        companyName,
        companyRegion,
        email,
        firstName,
        language,
        lastName,
        packageId,
        phoneNumber,
        switchboardName,
      } = req.body;
      const fullName = `${firstName} ${lastName}`;

      const ouInfo = await LeeonAPI.getOUPBXInfo();
      const pbxInfo = await LeeonAPI.createPBX({
        name: switchboardName,
        description: `Create new PBX with name ${switchboardName}`,
        parentId: ouInfo?.data.orgUnits[0].id || 0,
        type: 'pbx',
      });
      const orgUnitId = pbxInfo?.data.id || 0;
      await LeeonAPI.setMaxExtensions({
        orgUnitId,
        value: '5', // fake data
      });
      const user = await LeeonAPI.createUser({
        email,
        fullName,
        language,
        orgUnitId,
        password: generator.generate({
          length: 10,
          numbers: true,
        }),
      });
      await LeeonAPI.setRoleUser({
        orgUnitId,
        userId: user?.data.id || 0,
      });

      const response: HttpResponse<RegisterFreeResponse> = {
        data: {
          registerStatus: 'Success',
          user: user || null,
        },
        message: '',
      };
      res.json(response);
    } catch (error) {
      const leeonError = error as ErrorDataLeeonAPI;
      const response: HttpResponse<null> = {
        data: null,
        message: leeonError.message?.[0],
      };
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }
}

const instance = new RegisterFree();
export default instance;
