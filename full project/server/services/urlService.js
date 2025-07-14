import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import { Logger } from '../middleware/logging.js';

// In-memory storage (in production, use a database)
const urlStore = new Map();
const analytics = new Map();

export class UrlService {
  static generateShortcode(length = 6) {
    return nanoid(length);
  }
  
  static isValidUrl(url) {
    return validUrl.isUri(url);
  }
  
  static isValidShortcode(shortcode) {
    // Alphanumeric, 3-20 characters
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(shortcode);
  }
  
  static createShortUrl(originalUrl, validityMinutes = 30, customShortcode = null) {
    // Validate URL
    if (!this.isValidUrl(originalUrl)) {
      Logger.warn('Invalid URL provided', { url: originalUrl });
      throw new Error('Invalid URL format');
    }
    
    // Generate or validate shortcode
    let shortcode;
    if (customShortcode) {
      if (!this.isValidShortcode(customShortcode)) {
        Logger.warn('Invalid shortcode format', { shortcode: customShortcode });
        throw new Error('Invalid shortcode format. Must be alphanumeric, 3-20 characters');
      }
      
      if (urlStore.has(customShortcode)) {
        Logger.warn('Shortcode already exists', { shortcode: customShortcode });
        throw new Error('Shortcode already exists');
      }
      
      shortcode = customShortcode;
    } else {
      // Generate unique shortcode
      do {
        shortcode = this.generateShortcode(8); // Longer for better uniqueness
      } while (urlStore.has(shortcode));
    }
    
    // Calculate expiry
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + validityMinutes);
    
    // Store URL data
    const urlData = {
      shortcode,
      originalUrl,
      createdAt: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
      validityMinutes,
      clickCount: 0
    };
    
    urlStore.set(shortcode, urlData);
    analytics.set(shortcode, []);
    
    Logger.info('Short URL created', {
      shortcode,
      originalUrl,
      validityMinutes,
      expiryDate: expiryDate.toISOString()
    });
    
    return {
      shortcode,
      expiryDate: expiryDate.toISOString()
    };
  }
  
  static getUrlData(shortcode) {
    return urlStore.get(shortcode);
  }
  
  static isExpired(urlData) {
    return new Date() > new Date(urlData.expiryDate);
  }
  
  static recordClick(shortcode, clickData) {
    const urlData = urlStore.get(shortcode);
    if (urlData) {
      urlData.clickCount++;
      urlStore.set(shortcode, urlData);
      
      const clicks = analytics.get(shortcode) || [];
      clicks.push({
        timestamp: new Date().toISOString(),
        ...clickData
      });
      analytics.set(shortcode, clicks);
      
      Logger.info('Click recorded', {
        shortcode,
        clickCount: urlData.clickCount,
        ...clickData
      });
    }
  }
  
  static getAnalytics(shortcode) {
    const urlData = urlStore.get(shortcode);
    const clicks = analytics.get(shortcode) || [];
    
    if (!urlData) {
      return null;
    }
    
    return {
      shortcode,
      originalUrl: urlData.originalUrl,
      createdAt: urlData.createdAt,
      expiryDate: urlData.expiryDate,
      totalClicks: urlData.clickCount,
      clicks: clicks.map(click => ({
        timestamp: click.timestamp,
        referrer: click.referrer || 'Direct',
        userAgent: click.userAgent,
        ip: click.ip,
        location: click.location
      }))
    };
  }
  
  static getAllUrls() {
    return Array.from(urlStore.entries()).map(([shortcode, data]) => ({
      shortcode,
      ...data,
      clicks: analytics.get(shortcode)?.length || 0
    }));
  }
}