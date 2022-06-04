import express from 'express';
import AuthController from '../controllers/regsiter-free/authentication.controller';
import validation from '../services/validation/authentication.validation';
const router = express.Router();

/* Register  */
router.post('/register', validation.validateRegister(), AuthController.register);

/* Login */
router.post('/login', validation.validateLogin(), AuthController.login);

export default router;
