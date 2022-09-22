import joi from 'joi';
import { VoucherApplyData } from '../services/voucherService';

export const voucherUseDataSchema = joi.object<VoucherApplyData>({
  code: joi.string().required(),
  amount: joi.number().min(0).required()
});
