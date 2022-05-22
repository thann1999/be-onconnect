import { body } from 'express-validator';

class RegisterFreeValidation {
  validateRegisterFree() {
    return [
      body('email', 'Email is required').notEmpty(),
      body('fistName', 'fistName is required').notEmpty(),
      body('lastName', 'lastName is required').notEmpty(),
      body('phoneNumber', 'phoneNumber is required').notEmpty(),
      body('switchboardName', 'SwitchboardName is required').notEmpty(),
      body('packageId', 'packageId is required').notEmpty(),
      body('language', 'language is required').notEmpty(),
    ];
  }
}

const instance = new RegisterFreeValidation();
export default instance;
