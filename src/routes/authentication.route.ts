import express from 'express';
import AuthController from '../controllers/regsiter-free/authentication.controller';
import validation from '../services/validation/authentication.validation';
import { auth } from '../services/jwt-token/verify-token';
const router = express.Router();

/* Register  */
router.post('/register', validation.validateRegister(), AuthController.register);

/* Login */
router.post('/login', validation.validateLogin(), AuthController.login);

/* Change password */
router.post(
  '/change-password',
  validation.validateChangePassword(),
  auth,
  AuthController.changePassword
);

export default router;
