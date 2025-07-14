import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface CreateUrlRequest {
  url: string;
  validity?: number;
  shortcode?: string;
}

interface CreateUrlResponse {
  shortLink: string;
  expiry: string;
}

interface AnalyticsResponse {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiryDate: string;
  totalClicks: number;
  clicks: Array<{
    timestamp: string;
    referrer: string;
    userAgent: string;
    ip: string;
    location: string;
  }>;
}

export const urlService = {
  async createShortUrl(data: CreateUrlRequest): Promise<CreateUrlResponse> {
    const response = await api.post('/shorturls', data);
    return response.data;
  },
  
  async getAnalytics(shortcode: string): Promise<AnalyticsResponse> {
    const response = await api.get(`/shorturls/${shortcode}`);
    return response.data;
  },
  
  async getAllUrls(): Promise<any[]> {
    // This would need a custom endpoint in a real implementation
    // For now, return empty array as this endpoint doesn't exist in the spec
    return [];
  },
  
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  }
};