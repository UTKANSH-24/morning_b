import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

config(); // This should come after import { config } from 'dotenv';

const app = express();
// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Third-Party
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders:["Set-Cookie"]
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log(req.cookies);
    res.sendStatus(200);
  } else {
    console.log(JSON.stringify(req.cookies));

    next();
  }
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';
import merchandiseRoutes from './routes/merchandise.routes.js';
import accommodation from './routes/accommodation.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1', miscRoutes);
app.use('/api/v1/merchandise', merchandiseRoutes);
app.use('/api/v1/accommodation', accommodation);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});
// Custom error handling middleware
app.use(errorMiddleware);
export default app;
