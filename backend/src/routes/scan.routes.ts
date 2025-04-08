import { Router } from 'express';
import { getScanHistory } from '../controllers/scan.controller';

const router = Router();

router.get('/history', getScanHistory);

export default router;
