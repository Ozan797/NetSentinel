import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#4ade80', '#facc15', '#f87171']; // green, amber, red

export default function RiskPieChart({ data }: { data: { lowRisk: number, mediumRisk: number, highRisk: number } }) {
  const pieData = [
    { name: 'Low Risk', value: data.lowRisk },
    { name: 'Medium Risk', value: data.mediumRisk },
    { name: 'High Risk', value: data.highRisk },
  ];

  return (
    <motion.div
      style={{ width: '100%', height: 300, marginTop: '40px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 style={{ marginBottom: 12, fontSize: '18px', fontWeight: 600 }}>Risk Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
