import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /scan/history
 * Returns all previous scans sorted by most recent
 */
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

/**
 * GET /scan/:id
 * Returns one scan and all associated devices
 */
export const getScanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const scanId = parseInt(id, 10);
    if (isNaN(scanId)) {
      return res.status(400).json({ error: 'Invalid scan ID' });
    }

    const scan = await prisma.scan.findUnique({
      where: { id: scanId },
      include: { devices: true },
    });

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.json(scan);
  } catch (error) {
    console.error('❌ Failed to fetch scan by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
