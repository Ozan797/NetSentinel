import { Router } from 'express';
import { getScanHistory, getScanById } from '../controllers/scan.controller';

const router = Router();

router.get('/history', getScanHistory);
router.get('/:id', getScanById);

export default router;
