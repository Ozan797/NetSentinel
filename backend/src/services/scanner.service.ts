import { exec } from 'child_process';
import util from 'util';
import { scanPorts } from '../utils/portScanner';
import { calculateRisk } from '../utils/riskScorer';
import { classifyDevice } from '../utils/deviceClassifier';
import { populateArpTable } from '../utils/pingSweep';

const execPromise = util.promisify(exec);

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
    // Populate ARP cache with ping sweep
    await populateArpTable('192.168.1');

    // Get ARP entries
    const { stdout } = await execPromise('arp -a');
    const lines = stdout.split('\n');

    // Concurrently process each device line
    const devices = await Promise.allSettled(
      lines.map(async (line) => {
        const match = line.match(/\((.*?)\) at ([0-9a-f:]+)/i);
        if (!match) return null;

        const ip = match[1];
        const mac = match[2];
        const openPorts = await scanPorts(ip, COMMON_PORTS);
        const { riskScore, riskLevel } = calculateRisk({ ip, mac, openPorts });
        const deviceType = classifyDevice(ip, openPorts);

        return { ip, mac, openPorts, riskScore, riskLevel, deviceType };
      })
    );

    // Filter and return valid device results
    return devices
      .filter((res) => res.status === 'fulfilled' && res.value !== null)
      .map((res) => (res as PromiseFulfilledResult<any>).value);
  } catch (error) {
    console.error('❌ ARP scan failed:', error);
    return [];
  }
};
