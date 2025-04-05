import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { title, author, description, pageCount, coverUrl, isbn } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: { title, author, description, pageCount, coverUrl, isbn },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book' });
  }
};
