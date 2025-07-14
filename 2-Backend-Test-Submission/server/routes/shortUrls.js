import express from 'express';
import { UrlService } from '../services/urlService.js';
import { Logger } from '../middleware/logging.js';

const router = express.Router();

// Create short URL
router.post('/', async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    
    // Validate required fields
    if (!url) {
      Logger.warn('URL creation failed - missing URL', { body: req.body });
      return res.status(400).json({
        error: 'Bad Request',
        message: 'URL is required'
      });
    }
    
    const validityMinutes = validity || 30;
    
    // Validate validity is a positive number
    if (validityMinutes <= 0) {
      Logger.warn('Invalid validity period', { validity: validityMinutes });
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Validity must be a positive number'
      });
    }
    
    const result = UrlService.createShortUrl(url, validityMinutes, shortcode);
    const baseUrl = 'https://short.ly'; // Clean short domain
    
    Logger.info('Short URL created successfully', {
      shortcode: result.shortcode,
      originalUrl: url,
      ip: req.ip
    });
    
    res.status(201).json({
      shortLink: `${baseUrl}/${result.shortcode}`,
      expiry: result.expiryDate
    });
    
  } catch (error) {
    Logger.error('Error creating short URL', {
      error: error.message,
      body: req.body,
      ip: req.ip
    });
    
    res.status(400).json({
      error: 'Bad Request',
      message: error.message
    });
  }
});

// Get URL statistics
router.get('/:shortcode', (req, res) => {
  try {
    const { shortcode } = req.params;
    
    const analytics = UrlService.getAnalytics(shortcode);
    
    if (!analytics) {
      Logger.warn('Statistics requested for non-existent shortcode', {
        shortcode,
        ip: req.ip
      });
      return res.status(404).json({
        error: 'Not Found',
        message: 'Shortcode not found'
      });
    }
    
    Logger.info('Statistics retrieved', {
      shortcode,
      totalClicks: analytics.totalClicks,
      ip: req.ip
    });
    
    res.json(analytics);
    
  } catch (error) {
    Logger.error('Error retrieving statistics', {
      error: error.message,
      shortcode: req.params.shortcode,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve statistics'
    });
  }
});

export { router as shortUrlRoutes };