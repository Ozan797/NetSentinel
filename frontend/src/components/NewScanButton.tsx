import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewScanButton({ onScanComplete }: { onScanComplete: () => void }) {
  const [loading, setLoading] = useState(false);

  const runScan = async () => {
    setLoading(true);
    try {
      await axios.get('http://localhost:3000/devices');
      onScanComplete();
    } catch (err) {
      console.error('❌ Scan failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={runScan}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04 } : {}}
      whileTap={!loading ? { scale: 0.98 } : {}}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 600,
        borderRadius: '12px',
        backgroundColor: '#6366f1',
        color: '#fff',
        border: 'none',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'background-color 0.3s ease',
        marginBottom: '28px'
      }}
    >
      {loading ? '🔍 Scanning Network...' : '🔄 Run New Scan'}
    </motion.button>
  );
}
