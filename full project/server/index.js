import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loggingMiddleware } from './middleware/logging.js';
import { shortUrlRoutes } from './routes/shortUrls.js';
import { redirectRoute } from './routes/redirect.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use(loggingMiddleware);

// Routes
app.use('/shorturls', shortUrlRoutes);
app.use('/', redirectRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 URL Shortener Microservice running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});