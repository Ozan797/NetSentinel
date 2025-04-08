import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/device.routes';
import scanRoutes from './routes/scan.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/devices', deviceRoutes);
app.use('/scan', scanRoutes);

app.listen(PORT, () => {
  console.log(`NetSentinel backend running on port ${PORT}`);
});
