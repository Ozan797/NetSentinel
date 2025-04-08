export const classifyDevice = (ip: string, openPorts: number[]): string => {
  if (ip.endsWith('.1') || ip.endsWith('.254')) return 'Router or Gateway';
  if (openPorts.includes(22)) return 'SSH Server';
  if (openPorts.includes(3306)) return 'Database Server';
  if (openPorts.includes(80) || openPorts.includes(443)) return 'Web Server';
  if (openPorts.length === 0) return 'Passive Device or Firewalled';

  return 'Unknown Device';
};
