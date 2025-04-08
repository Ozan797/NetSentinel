import util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

export const populateArpTable = async (subnet = '192.168.1'): Promise<void> => {
  const promises = [];

  for (let i = 1; i <= 254; i++) {
    const ip = `${subnet}.${i}`;
    const cmd = `ping -c 1 -W 1 ${ip}`;
    promises.push(execPromise(cmd).catch(() => null));
  }

  await Promise.allSettled(promises);
};
