import express from 'express';
import geoip from 'geoip-lite';
import { UrlService } from '../services/urlService.js';
import { Logger } from '../middleware/logging.js';

const router = express.Router();

// Handle redirects
router.get('/:shortcode', (req, res) => {
  try {
    const { shortcode } = req.params;
    
    const urlData = UrlService.getUrlData(shortcode);
    
    if (!urlData) {
      Logger.warn('Redirect attempted for non-existent shortcode', {
        shortcode,
        ip: req.ip
      });
      return res.status(404).json({
        error: 'Not Found',
        message: 'Short URL not found'
      });
    }
    
    // Check if URL has expired
    if (UrlService.isExpired(urlData)) {
      Logger.warn('Redirect attempted for expired URL', {
        shortcode,
        expiryDate: urlData.expiryDate,
        ip: req.ip
      });
      return res.status(410).json({
        error: 'Gone',
        message: 'Short URL has expired'
      });
    }
    
    // Get location from IP
    const location = geoip.lookup(req.ip) || { country: 'Unknown', city: 'Unknown' };
    
    // Record click analytics
    UrlService.recordClick(shortcode, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer'),
      location: `${location.city}, ${location.country}`
    });
    
    Logger.info('Successful redirect', {
      shortcode,
      originalUrl: urlData.originalUrl,
      ip: req.ip,
      location: `${location.city}, ${location.country}`
    });
    
    // Redirect to original URL
    res.redirect(302, urlData.originalUrl);
    
  } catch (error) {
    Logger.error('Error during redirect', {
      error: error.message,
      shortcode: req.params.shortcode,
      ip: req.ip
    });
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to process redirect'
    });
  }
});

export { router as redirectRoute };