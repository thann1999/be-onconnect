import { body } from 'express-validator';

class PackageValidation {
  validateUpgradePackage() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid'),
      body('firstName', 'FirstName is required').notEmpty(),
      body('lastName', 'LastName is required').notEmpty(),
      body('phoneNumber', 'PhoneNumber is required').notEmpty(),
      body('packageName', 'Package name is required').notEmpty(),
      body('companyName', 'companyName is required').notEmpty(),
      body('companyRegion', 'companyRegion is required').notEmpty(),
    ];
  }
}

const instance = new PackageValidation();
export default instance;
