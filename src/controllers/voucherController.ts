import { Request, Response } from 'express';
import voucherService from '../services/voucherService';

async function createVoucher(req: Request, res: Response) {
  const { code, discount } = req.body;
  await voucherService.createVoucher(code, discount);

  res.sendStatus(201);
}

async function applyVoucher(req: Request, res: Response) {
  const { code, amount } = req.body;
  const order = await voucherService.applyVoucher(code, amount);

  res.send(order);
}

export default {
  applyVoucher,
  createVoucher
};
