import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

// Load environment variables from .env file
config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "https://utkansh24.vercel.app",
  "http://localhost:3000",
  "*",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Custom CORS handling for preflight requests
app.options('*', cors());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import routes
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';
import merchandiseRoutes from './routes/merchandise.routes.js';
import accommodationRoutes from './routes/accommodation.routes.js';

// Route middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1', miscRoutes);
app.use('/api/v1/merchandise', merchandiseRoutes);
app.use('/api/v1/accommodation', accommodationRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
