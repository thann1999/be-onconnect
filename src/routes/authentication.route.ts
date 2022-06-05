import express from 'express';
import authController from '../controllers/regsiter-free/authentication.controller';
import validation from '../services/validation/authentication.validation';
import { auth } from '../services/jwt-token/verify-token';
const router = express.Router();

/* Register  */
router.post('/register', validation.validateRegister(), authController.register);

/* Login */
router.post('/login', validation.validateLogin(), authController.login);

/* Change password */
router.post(
  '/change-password',
  validation.validateChangePassword(),
  auth,
  authController.changePassword
);

export default router;
