import { NextFunction, Request, Response } from 'express';
import { validationHandleError } from '../../services/validation/validation-handle-error';
import { HttpResponse, HttpStatus } from '../../services/http/http.type';
import { RegisterFreeResponse } from './register-free.type';
import LeeonAPI from '../../api/leeon.api';
import generator from 'generate-password';
import { Role, UserInfo, UserRequestBody } from '../../shared/types/user.type';
import UserDao from '../../dao/user.dao';
import { getMailContent, sendMail } from '../../services/send-email/email.service';
import { handleError } from '../../services/http/handle-error.service';
import { RegisterFreeMessage } from '../../shared/const/message.const';
import { delay } from '../../helpers/delay.helper';

class RegisterFree {
  async register(req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction) {
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
      await delay(1000);
      await LeeonAPI.setMaxExtensions({
        orgUnitId,
        value: '5', // fake data
      });
      const generatePassword = `${generator.generate({
        length: 9,
        numbers: true,
      })}1`;

      const user = await LeeonAPI.createUser({
        email,
        fullName,
        language,
        orgUnitId,
        password: generatePassword,
      });

      await LeeonAPI.setRoleUser({
        orgUnitId,
        userId: String(user?.data.id) || '',
      });

      const userInfo: UserInfo = {
        email,
        firstName,
        language,
        lastName,
        packageId,
        phoneNumber,
        switchboardName,
        companyName,
        companyRegion,
        orgUnitId,
        leeonPassword: user?.data.password || '',
        password: generatePassword,
        leeonUserId: user?.data.id || 0,
        role: Role.USER,
      };

      await UserDao.insertUser(userInfo);

      const response: HttpResponse<RegisterFreeResponse> = {
        data: {
          user: userInfo || null,
        },
        message: '',
        status: HttpStatus.SUCCESS,
      };

      await sendMail(getMailContent(email, generatePassword))
        .then(() => {
          console.log(`Email sent: ${email}`);
        })
        .catch(() => {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${RegisterFreeMessage.SEND_MAIL_FAIL} ${email}`,
          });
        });

      res.status(response.status).json(response.data);
    } catch (error) {
      const leeonError = handleError(error);
      res.status(leeonError.status).json(leeonError);
    }
  }
}

const instance = new RegisterFree();
export default instance;
