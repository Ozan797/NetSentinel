import './Card.css';

interface CardProps {
  title: string;
  value: string | number;
  variant?: 'high' | 'medium' | 'low' | 'default';
}

export default function Card({ title, value, variant = 'default' }: CardProps) {
  const classes = `card card-${variant}`;

  return (
    <div className={classes}>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}
