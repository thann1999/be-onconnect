import { body } from 'express-validator';

class AuthValidation {
  validateRegister() {
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

  validateLogin() {
    return [
      body('email', 'Email is required').notEmpty(),
      body('password', 'Password is required').notEmpty(),
    ];
  }

  validateChangePassword() {
    return [
      body('currentPassword', 'Current password is required').notEmpty(),
      body('newPassword', 'New password is required').notEmpty(),
    ];
  }
}

const instance = new AuthValidation();
export default instance;
