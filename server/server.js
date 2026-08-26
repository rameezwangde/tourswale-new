import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchFlights } from './controllers/flightController.js';
import { searchHotels } from './controllers/hotelController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/flights', searchFlights);
app.get('/api/hotels', searchHotels);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Tourswale Backend is running.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
