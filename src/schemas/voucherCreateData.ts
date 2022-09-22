import joi from 'joi';
import { VoucherCreateData } from '../services/voucherService';

export const voucherCreateDataSchema = joi.object<VoucherCreateData>({
  code: joi.string().required(),
  discount: joi.number().min(1).max(100).required()
});
