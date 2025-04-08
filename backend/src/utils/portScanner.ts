import net from 'net';

export const scanPorts = async (ip: string, ports: number[]): Promise<number[]> => {
  const openPorts: number[] = [];

  const scanSinglePort = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      let isOpen = false;

      socket.setTimeout(1000); // 1 second timeout

      socket.connect(port, ip, () => {
        isOpen = true;
        socket.destroy();
      });

      socket.on('timeout', () => socket.destroy());
      socket.on('error', () => socket.destroy());
      socket.on('close', () => resolve(isOpen));
    });
  };

  for (const port of ports) {
    const isOpen = await scanSinglePort(port);
    if (isOpen) openPorts.push(port);
  }

  return openPorts;
};
