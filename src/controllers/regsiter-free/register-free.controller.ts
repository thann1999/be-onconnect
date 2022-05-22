import { NextFunction, Request, Response } from 'express';
import { validationHandleError } from '../../services/validation/validation-handle-error';
import { HttpResponse, HttpStatus } from '../../services/http/http.type';
import { RegisterFreeBody, RegisterFreeResponse } from './register-free.type';

class RegisterFree {
  register(req: Request<{}, {}, RegisterFreeBody>, res: Response, next: NextFunction) {
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

    const validationErrors = validationHandleError(req);
    if (validationErrors.errors) {
      return res.status(HttpStatus.BAD_REQUEST).json(validationErrors);
    }

    console.log(req.body);
    const response: HttpResponse<RegisterFreeResponse> = {
      data: {
        registerStatus: 'Success',
      },
      status: HttpStatus.SUCCESS,
    };
    res.json(response);
  }
}

const instance = new RegisterFree();
export default instance;
