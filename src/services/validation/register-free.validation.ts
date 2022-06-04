import { body } from 'express-validator';

class RegisterFreeValidation {
  validateRegisterFree() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid'),
      body('firstName', 'FirstName is required').notEmpty(),
      body('lastName', 'LastName is required').notEmpty(),
      body('phoneNumber', 'PhoneNumber is required').notEmpty(),
      body('switchboardName', 'SwitchboardName is required').notEmpty(),
      body('packageId', 'PackageId is required').notEmpty(),
      body('language')
        .notEmpty()
        .withMessage('Language is required')
        .isIn(['vi', 'en', 'de', 'fr', 'it'])
        .withMessage('Language only is vi, en, de, fr, it'),
    ];
  }
}

const instance = new RegisterFreeValidation();
export default instance;
