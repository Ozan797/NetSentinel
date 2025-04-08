import { Request, Response } from 'express';
import { scanLocalNetwork } from '../services/scanner.service';

export const getDevices = async (req: Request, res: Response) => {
  const devices = await scanLocalNetwork();
  res.json(devices);
};
