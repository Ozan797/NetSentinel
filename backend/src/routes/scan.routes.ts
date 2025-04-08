import { Router } from 'express';
import { getScanHistory, getScanById, getScanSummary } from '../controllers/scan.controller';

const router = Router();

router.get('/history', getScanHistory);
router.get('/summary', getScanSummary); // GET /scan/summary
router.get('/:id', getScanById);

export default router;
