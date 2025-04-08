import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getScanHistory = async (req: Request, res: Response) => {
  try {
    const scans = await prisma.scan.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(scans);
  } catch (error) {
    console.error('❌ Failed to fetch scan history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
