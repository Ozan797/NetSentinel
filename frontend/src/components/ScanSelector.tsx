import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScanSelector({ onSelect }: { onSelect: (id: number) => void }) {
  const [scans, setScans] = useState<{ id: number; createdAt: string }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/scan/history')
      .then(res => setScans(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor="scan-select" style={{ fontWeight: 500, marginRight: 8 }}>View Scan:</label>
      <select
        id="scan-select"
        onChange={(e) => onSelect(parseInt(e.target.value))}
        style={{ padding: '6px 10px', fontSize: '16px', borderRadius: '8px' }}
      >
        {scans.map((scan) => (
          <option key={scan.id} value={scan.id}>
            Scan #{scan.id} — {new Date(scan.createdAt).toLocaleString()}
          </option>
        ))}
      </select>
    </div>
  );
}
