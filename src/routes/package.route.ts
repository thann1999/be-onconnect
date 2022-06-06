import express from 'express';
import packageController from '../controllers/package/package.controller';
import validation from '../services/validation/package.validation';
import { auth } from '../services/jwt-token/verify-token';
const router = express.Router();

/* Get list all package  */
router.get('/list-all', packageController.getListAll);

/* Get list all package  */
router.get('/option-list', packageController.getOptionList);

/* Get compare package  */
router.get('/compare', packageController.getListCompare);

/* POST upgrade package  */
router.post(
  '/upgrade',
  validation.validateUpgradePackage(),
  auth,
  packageController.upgradePackage
);

export default router;
