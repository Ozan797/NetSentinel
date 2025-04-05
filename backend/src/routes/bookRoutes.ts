import { Router } from 'express';
import { getBooks, addBook } from '../controllers/bookController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBooks);
// Protect this route so that only authenticated users can add books.
router.post('/', authenticateToken, addBook);

export default router;
