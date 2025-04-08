type Device = {
    ip: string;
    mac: string;
    openPorts: number[];
    riskScore: number;
    riskLevel: string;
    deviceType: string;
  };
  
  export default function DeviceTable({ devices }: { devices: Device[] }) {
    return (
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Devices</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
              <th>IP Address</th>
              <th>MAC</th>
              <th>Ports</th>
              <th>Risk</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td>{d.ip}</td>
                <td>{d.mac}</td>
                <td>{d.openPorts.join(', ') || '—'}</td>
                <td>{d.riskLevel} ({d.riskScore})</td>
                <td>{d.deviceType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  