import prisma from '../config/database';

function getVoucherByCode(code: string) {
  return prisma.voucher.findUnique({
    where: { code }
  });
}

function createVoucher(code: string, discount: number) {
  return prisma.voucher.create({
    data: { code, discount }
  });
}

function useVoucher(code: string) {
  return prisma.voucher.update({
    where: { code },
    data: { used: true }
  });
}

export default {
  getVoucherByCode,
  createVoucher,
  useVoucher
};
