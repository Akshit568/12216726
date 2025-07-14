import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'access.log');

class Logger {
  static log(level, message, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      pid: process.pid
    };
    
    const logString = JSON.stringify(logEntry) + '\n';
    
    // Write to file
    fs.appendFileSync(logFilePath, logString);
    
    // Also log to console for development
    console.log(`[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}`, metadata);
  }
  
  static info(message, metadata) {
    this.log('info', message, metadata);
  }
  
  static error(message, metadata) {
    this.log('error', message, metadata);
  }
  
  static warn(message, metadata) {
    this.log('warn', message, metadata);
  }
  
  static debug(message, metadata) {
    this.log('debug', message, metadata);
  }
}

export const loggingMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Log incoming request
  Logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    headers: req.headers
  });
  
  // Override res.end to capture response
  const originalEnd = res.end;
  res.end = function(...args) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    Logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    });
    
    originalEnd.apply(res, args);
  };
  
  next();
};

export { Logger };