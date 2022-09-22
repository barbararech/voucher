import { Router } from 'express';

import voucherRouter from './voucherRouter';

const router = Router();

router.use(voucherRouter);

export default router;
