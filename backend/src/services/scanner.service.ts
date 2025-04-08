import { exec } from 'child_process';
import util from 'util';
import { scanPorts } from '../utils/portScanner';
import { calculateRisk } from '../utils/riskScorer';
import { classifyDevice } from '../utils/deviceClassifier';
import { populateArpTable } from '../utils/pingSweep';
import { PrismaClient } from '@prisma/client';

const execPromise = util.promisify(exec);
const prisma = new PrismaClient();

const COMMON_PORTS = [22, 80, 443, 3306];

export const scanLocalNetwork = async (): Promise<{
  ip: string;
  mac: string;
  openPorts: number[];
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  deviceType: string;
}[]> => {
  try {
    // Step 1: Active ping sweep to fill ARP cache
    await populateArpTable('192.168.1');

    // Step 2: Create a new Scan record in the DB
    const scanRecord = await prisma.scan.create({ data: {} });

    // Step 3: Read from ARP cache
    const { stdout } = await execPromise('arp -a');
    const lines = stdout.split('\n');

    // Step 4: Concurrently process devices
    const devices = await Promise.allSettled(
      lines.map(async (line) => {
        const match = line.match(/\((.*?)\) at ([0-9a-f:]+)/i);
        if (!match) return null;

        const ip = match[1];
        const mac = match[2];
        const openPorts = await scanPorts(ip, COMMON_PORTS);
        const { riskScore, riskLevel } = calculateRisk({ ip, mac, openPorts });
        const deviceType = classifyDevice(ip, openPorts);

        // Step 5: Save each device to the DB
        await prisma.device.create({
          data: {
            ip,
            mac,
            openPorts,
            riskScore,
            riskLevel,
            deviceType,
            scanId: scanRecord.id
          }
        });

        return { ip, mac, openPorts, riskScore, riskLevel, deviceType };
      })
    );

    // Step 6: Return successful results to the API
    return devices
      .filter((res) => res.status === 'fulfilled' && res.value !== null)
      .map((res) => (res as PromiseFulfilledResult<any>).value);
  } catch (error) {
    console.error('❌ Full scan failed:', error);
    return [];
  }
};
