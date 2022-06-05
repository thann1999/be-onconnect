import express from 'express';
import PackageController from '../controllers/package/package.controller';
const router = express.Router();

/* Get list all package  */
router.get('/list-all', PackageController.getListAll);

/* Get compare package  */
router.get('/compare', PackageController.getListCompare);

export default router;
