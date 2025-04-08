import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import RiskPieChart from '../components/RiskPieChart';
import ScanSelector from '../components/ScanSelector';
import DeviceTable from '../components/DeviceTable';
import NewScanButton from '../components/NewScanButton';

type Device = {
  ip: string;
  mac: string;
  openPorts: number[];
  riskScore: number;
  riskLevel: string;
  deviceType: string;
};

export default function Dashboard() {
  const [scanId, setScanId] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [scannedAt, setScannedAt] = useState<string | null>(null);

  const loadLatestScan = async () => {
    try {
      const res = await axios.get('http://localhost:3000/scan/history');
      const latest = res.data[0];
      if (latest) setScanId(latest.id);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    loadLatestScan();
  }, []);
  

  useEffect(() => {
    if (scanId !== null) {
      axios.get(`http://localhost:3000/scan/${scanId}`)
        .then(res => {
          setDevices(res.data.devices);
          setScannedAt(res.data.createdAt);
        })
        .catch(console.error);
    }
  }, [scanId]);

  const summary = {
    totalDevices: devices.length,
    highRisk: devices.filter(d => d.riskLevel === 'High').length,
    mediumRisk: devices.filter(d => d.riskLevel === 'Medium').length,
    lowRisk: devices.filter(d => d.riskLevel === 'Low').length,
  };

  return (
    <div>
      <NewScanButton onScanComplete={loadLatestScan} />
      <ScanSelector onSelect={setScanId} />

      <div className="card-grid">
        <Card title="Total Devices" value={summary.totalDevices} />
        <Card title="High Risk" value={summary.highRisk} variant="high" />
        <Card title="Medium Risk" value={summary.mediumRisk} variant="medium" />
        <Card title="Low Risk" value={summary.lowRisk} variant="low" />
        <Card title="Scan ID" value={scanId ?? '-'} />
      </div>

      <RiskPieChart data={summary} />
      <DeviceTable devices={devices} />

      {scannedAt && (
        <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
          Scanned at: {new Date(scannedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
