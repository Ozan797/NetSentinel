export interface RiskProfileInput {
    ip: string;
    mac: string;
    openPorts: number[];
  }
  
  export interface RiskProfileOutput {
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  }
  
  export const calculateRisk = (device: RiskProfileInput): RiskProfileOutput => {
    let score = 0;
  
    if (device.openPorts.includes(22)) score += 30; // SSH
    if (device.openPorts.includes(3306)) score += 25; // MySQL
    if (device.openPorts.includes(80) || device.openPorts.includes(443)) score += 10; // Web
  
    if (!device.mac || device.mac.startsWith('ff:ff:ff') || device.mac.startsWith('1:0:5e')) {
      score += 20;
    }
  
    if (device.ip.endsWith('.255') || device.ip.startsWith('224.')) {
      score += 15;
    }
  
    let level: 'Low' | 'Medium' | 'High' = 'Low';
    if (score >= 60) level = 'High';
    else if (score >= 30) level = 'Medium';
  
    return {
      riskScore: score,
      riskLevel: level
    };
  };
  