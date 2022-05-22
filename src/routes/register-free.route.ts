import express from 'express';
import RegisterfreeController from '../controllers/regsiter-free/register-free.controller';
import validation from '../services/validation/register-free.validation';
const router = express.Router();

/* GET home page. */
router.get('/', validation.validateRegisterFree(), RegisterfreeController.register);

export default router;
