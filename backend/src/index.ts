import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('LeafLog backend is running 🌿');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
