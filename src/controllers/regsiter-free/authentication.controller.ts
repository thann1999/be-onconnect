import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import generator from 'generate-password';
import jwt, { Secret } from 'jsonwebtoken';
import LeeonAPI from '../../api/leeon.api';
import UserDao from '../../dao/user.dao';
import { delay } from '../../helpers/delay.helper';
import { handleError } from '../../services/http/handle-error.service';
import { HttpResponse, HttpStatus } from '../../services/http/http.type';
import { getMailContent, sendMail } from '../../services/send-email/email.service';
import { validationHandleError } from '../../services/validation/validation-handle-error';
import { LoginMessage, RegisterMessage } from '../../shared/const/message.const';
import { Role, UserInfo, UserRequestBody } from '../../shared/types/user.type';
import { LoginRequestBody, LoginResponse, UserModelInfo } from './authentication.type';

class AuthController {
  register = async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
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
        password: this.hashPassword(generatePassword),
        leeonUserId: user?.data.id || 0,
        role: Role.USER,
      };

      await UserDao.insertUser(userInfo);
      const response: HttpResponse<null> = {
        data: null,
        message: '',
        status: HttpStatus.SUCCESS,
      };

      await sendMail(getMailContent(email, generatePassword))
        .then(() => {
          console.log(`Email sent: ${email}`);
        })
        .catch(() => {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${RegisterMessage.SEND_MAIL_FAIL} ${email}`,
          });
        });

      res.status(response.status).json(response);
    } catch (error) {
      const leeonError = handleError(error);
      res.status(leeonError.status).json(leeonError);
    }
  };

  login = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
    const validationErrors = validationHandleError(req);
    if (validationErrors.errors) {
      return res.status(HttpStatus.BAD_REQUEST).json(validationErrors);
    }

    try {
      const { email, password } = req.body;
      const result = (await UserDao.findUserByEmailAndPassword(
        email,
        this.hashPassword(password)
      )) as UserModelInfo | undefined;

      const response: HttpResponse<LoginResponse> = {
        data: {
          accessToken: '',
          user: null,
        },
        status: HttpStatus.BAD_REQUEST,
      };

      if (result) {
        const {
          createdAt,
          email,
          firstName,
          id,
          language,
          lastName,
          packageId,
          phoneNumber,
          switchboardName,
          companyName,
          companyRegion,
        } = result;
        response.data = {
          accessToken: this.generateJWTToken(result.email, result.id, result.switchboardName),
          user: {
            email,
            firstName,
            id,
            language,
            lastName,
            packageId,
            phoneNumber,
            switchboardName,
            companyName,
            companyRegion,
            createdDate: createdAt,
          },
        };
        response.status = HttpStatus.SUCCESS;

        return res.status(response.status).json(response);
      }

      response.message = LoginMessage.LOGIN_INFO_WRONG;
      res.status(HttpStatus.BAD_REQUEST).json(response);
    } catch (error) {
      next(error);
    }
  };

  /* Hashing password by SHA256 */
  private hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('base64');
  };

  private generateJWTToken = (email: string, id: number, switchboardName: string): string => {
    const secret: Secret = process.env.JWT_SECRET_KEY || 'secret-key';
    return jwt.sign({ id, switchboardName, email }, secret, {
      expiresIn: '1d',
    });
  };
}

const instance = new AuthController();
export default instance;
