import { body } from 'express-validator';

class AuthValidation {
  validateRegister() {
    return [
      body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email not valid'),
      body('firstName', 'firstName is required').notEmpty(),
      body('lastName', 'lastName is required').notEmpty(),
      body('phoneNumber', 'phoneNumber is required').notEmpty(),
      body('switchboardName', 'switchboardName is required').notEmpty(),
      body('packageId', 'packageId is required').notEmpty(),
      body('language')
        .notEmpty()
        .withMessage('language is required')
        .isIn(['vi', 'en', 'de', 'fr', 'it'])
        .withMessage('language only is vi, en, de, fr, it'),
      body('companyName', 'companyName is required').notEmpty(),
      body('companyRegion', 'companyRegion is required').notEmpty(),
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
