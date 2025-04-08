import { exec } from 'child_process';
import util from 'util';
import { scanPorts } from '../utils/portScanner';
import { calculateRisk } from '../utils/riskScorer'; // <- make sure this exists

const execPromise = util.promisify(exec);

const COMMON_PORTS = [22, 80, 443, 3306];

export const scanLocalNetwork = async (): Promise<{
  ip: string;
  mac: string;
  openPorts: number[];
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}[]> => {
  try {
    const { stdout } = await execPromise('arp -a');
    const lines = stdout.split('\n');
    const devices: {
      ip: string;
      mac: string;
      openPorts: number[];
      riskScore: number;
      riskLevel: 'Low' | 'Medium' | 'High';
    }[] = [];

    for (const line of lines) {
      const match = line.match(/\((.*?)\) at ([0-9a-f:]+)/i);
      if (match) {
        const ip = match[1];
        const mac = match[2];
        const openPorts = await scanPorts(ip, COMMON_PORTS);

        const { riskScore, riskLevel } = calculateRisk({ ip, mac, openPorts });

        devices.push({ ip, mac, openPorts, riskScore, riskLevel });
      }
    }

    return devices;
  } catch (error) {
    console.error('❌ ARP scan failed:', error);
    return [];
  }
};
