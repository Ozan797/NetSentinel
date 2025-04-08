import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

interface ScanSummary {
  totalDevices: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  latestScanId: number;
  scannedAt: string;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<ScanSummary | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/scan/summary")
      .then((res) => setSummary(res.data))
      .catch(console.error);
  }, []);

  if (!summary) return <p style={{ padding: "1rem" }}>Loading summary...</p>;

  return (
    <section className="dashboard">
      <div className="card-grid">
        <Card title="Total Devices" value={summary.totalDevices} />
        <Card title="High Risk" value={summary.highRisk} variant="high" />
        <Card title="Medium Risk" value={summary.mediumRisk} variant="medium" />
        <Card title="Low Risk" value={summary.lowRisk} variant="low" />
        <Card title="Scan ID" value={summary.latestScanId} />
      </div>
    </section>
  );
}
