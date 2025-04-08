import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export const scanLocalNetwork = async (): Promise<{ ip: string; mac: string }[]> => {
  try {
    const { stdout } = await execPromise('arp -a');
    const lines = stdout.split('\n');
    const devices: { ip: string; mac: string }[] = [];

    for (const line of lines) {
      const match = line.match(/\((.*?)\) at ([0-9a-f:]+)/i);
      if (match) {
        devices.push({ ip: match[1], mac: match[2] });
      }
    }

    return devices;
  } catch (error) {
    console.error('Failed to run arp:', error);
    return [];
  }
};
