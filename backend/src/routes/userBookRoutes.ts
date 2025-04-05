import { Router } from 'express';
import { getUserBooks, addUserBook, addBookToUserBookshelf } from '../controllers/userBookController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Existing protected routes:
router.get('/', authenticateToken, getUserBooks);
router.post('/add-book', authenticateToken, addBookToUserBookshelf);

export default router;
