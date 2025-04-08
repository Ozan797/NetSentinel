import './Card.css';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  title: string;
  value: string | number;
  variant?: 'high' | 'medium' | 'low' | 'default';
}

export default function Card({ title, value, variant = 'default' }: CardProps) {
  const classes = `card card-${variant}`;

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <h2>{title}</h2>
      <p>{value}</p>
    </motion.div>
  );
}
