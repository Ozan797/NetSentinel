import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/device.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/devices', deviceRoutes);

app.listen(PORT, () => {
  console.log(`NetSentinel backend running on port ${PORT}`);
});
