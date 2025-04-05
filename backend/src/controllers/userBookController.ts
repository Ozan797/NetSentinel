// src/controllers/userBookController.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addBookToUserBookshelf: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Using Option 2 earlier: casting req as any to access user.
    const { userId } = (req as any).user as { userId: string };
    const { title, author, description, pageCount, coverUrl, isbn, status, rating, startedAt, finishedAt } = req.body;
    
    // Try to find the book by ISBN (or you could use title if ISBN is not provided)
    let book = await prisma.book.findUnique({
      where: { isbn },
    });
    // If the book does not exist, create it.
    if (!book) {
      book = await prisma.book.create({
        data: {
          title,
          author,
          description,
          pageCount,
          coverUrl,
          isbn,
        },
      });
    }
    // Create a UserBook record linking the user to the book.
    const userBook = await prisma.userBook.create({
      data: {
        userId,
        bookId: book.id,
        status,
        rating,
        startedAt: startedAt ? new Date(startedAt) : null,
        finishedAt: finishedAt ? new Date(finishedAt) : null,
      },
    });
    res.status(201).json({ book, userBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book to user bookshelf' });
  }
};
