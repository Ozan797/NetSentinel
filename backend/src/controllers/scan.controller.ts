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

/**
 * GET /scan/summary
 * Returns aggregated stats for the most recent scan
 */
export const getScanSummary = async (req: Request, res: Response) => {
  try {
    const latestScan = await prisma.scan.findFirst({
      orderBy: { createdAt: 'desc' },
      include: { devices: true },
    });

    if (!latestScan) {
      return res.json({
        totalDevices: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        latestScanId: null,
        scannedAt: null,
      });
    }

    const riskCounts = latestScan.devices.reduce(
      (acc, device) => {
        if (device.riskLevel === 'High') acc.highRisk++;
        else if (device.riskLevel === 'Medium') acc.mediumRisk++;
        else acc.lowRisk++;
        return acc;
      },
      { highRisk: 0, mediumRisk: 0, lowRisk: 0 }
    );

    res.json({
      totalDevices: latestScan.devices.length,
      latestScanId: latestScan.id,
      scannedAt: latestScan.createdAt,
      ...riskCounts,
    });
  } catch (error) {
    console.error('❌ Failed to generate scan summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
