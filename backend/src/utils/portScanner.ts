import net from 'net';

export const scanPorts = async (ip: string, ports: number[]): Promise<number[]> => {
  const scanSinglePort = (port: number): Promise<number | null> => {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      let isOpen = false;

      socket.setTimeout(700); // shorter timeout = faster scan

      socket.connect(port, ip, () => {
        isOpen = true;
        socket.destroy();
      });

      socket.on('timeout', () => socket.destroy());
      socket.on('error', () => socket.destroy());
      socket.on('close', () => resolve(isOpen ? port : null));
    });
  };

  const results = await Promise.allSettled(ports.map(scanSinglePort));
  return results
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => (r as PromiseFulfilledResult<number>).value);
};
