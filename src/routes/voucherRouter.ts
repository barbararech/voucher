import { Router } from 'express';
import voucherController from '../controllers/voucherController';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { voucherCreateDataSchema } from '../schemas/voucherCreateData';
import { voucherUseDataSchema } from '../schemas/voucherUseData';

const voucherRouter = Router();

voucherRouter.post(
  '/vouchers',
  validateSchemaMiddleware(voucherCreateDataSchema),
  voucherController.createVoucher
);
voucherRouter.post(
  '/vouchers/apply',
  validateSchemaMiddleware(voucherUseDataSchema),
  voucherController.applyVoucher
);

export default voucherRouter;
