import { Router } from 'express';
import { getBooks, addBook } from '../controllers/bookController';

const router = Router();

router.get('/', getBooks);
router.post('/', addBook);

export default router;
