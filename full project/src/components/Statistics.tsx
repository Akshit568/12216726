import React, { useState } from 'react';
import { Search, BarChart3, Globe, Calendar, MousePointer } from 'lucide-react';
import { urlService } from '../services/urlService';

interface Click {
  timestamp: string;
  referrer: string;
  userAgent: string;
  ip: string;
  location: string;
}

interface AnalyticsData {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiryDate: string;
  totalClicks: number;
  clicks: Click[];
}

export const Statistics: React.FC = () => {
  const [shortcode, setShortcode] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortcode.trim()) return;
    
    setLoading(true);
    setError('');
    setAnalytics(null);
    
    try {
      const data = await urlService.getAnalytics(shortcode);
      setAnalytics(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };
  
  const isExpired = (expiryDate: string) => {
    return new Date() > new Date(expiryDate);
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-white/30 transition-all duration-500">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
          <BarChart3 className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          URL Analytics
        </h2>
      </div>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-3">
          <div className="flex-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500"></div>
            <input
              type="text"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
              placeholder="Enter shortcode (e.g., abc123)"
                className="relative w-full px-6 py-5 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-500 bg-white/10 backdrop-blur-xl text-white placeholder-white/50 text-lg font-medium"
            />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <button
            type="submit"
            disabled={loading}
              className="relative px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-110 shadow-2xl"
          >
            <Search size={20} />
          </button>
          </div>
        </div>
      </form>
      
      {loading && (
        <div className="text-center py-16">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400/30 border-t-purple-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-600/30 blur-xl animate-pulse"></div>
          </div>
          <p className="mt-6 text-white/80 font-bold text-xl">Loading analytics magic... ✨</p>
        </div>
      )}
      
      {error && (
        <div className="p-6 bg-red-500/20 backdrop-blur-xl border border-red-400/50 rounded-2xl animate-shake shadow-2xl">
          <p className="text-red-200 font-bold text-lg">{error}</p>
        </div>
      )}
      
      {analytics && (
        <div className="space-y-8 animate-fadeIn">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 p-8 rounded-3xl border border-blue-400/50 transform hover:scale-110 transition-all duration-500 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <MousePointer size={20} className="text-blue-400 animate-bounce" />
                <span className="text-lg font-bold text-blue-200">Total Clicks</span>
              </div>
              <p className="text-4xl font-black text-white">{analytics.totalClicks}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/30 p-8 rounded-3xl border border-green-400/50 transform hover:scale-110 transition-all duration-500 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar size={20} className="text-green-400 animate-pulse" />
                <span className="text-lg font-bold text-green-200">Created</span>
              </div>
              <p className="text-2xl font-black text-white">
                {new Date(analytics.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className={`p-8 rounded-3xl border transform hover:scale-110 transition-all duration-500 backdrop-blur-xl shadow-2xl ${
              isExpired(analytics.expiryDate) 
                ? 'bg-gradient-to-br from-red-500/20 to-red-600/30 border-red-400/50' 
                : 'bg-gradient-to-br from-yellow-500/20 to-orange-600/30 border-yellow-400/50'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <Calendar size={20} className={
                  isExpired(analytics.expiryDate) 
                    ? 'text-red-400 animate-pulse' 
                    : 'text-yellow-400 animate-bounce'
                } />
                <span className={`text-lg font-bold ${
                  isExpired(analytics.expiryDate) 
                    ? 'text-red-200' 
                    : 'text-yellow-200'
                }`}>
                  {isExpired(analytics.expiryDate) ? 'Expired' : 'Expires'}
                </span>
              </div>
              <p className={`text-2xl font-black ${
                isExpired(analytics.expiryDate) 
                  ? 'text-white' 
                  : 'text-white'
              }`}>
                {new Date(analytics.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* URL Info */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="font-bold text-white mb-4 flex items-center text-xl">
              <Globe size={20} className="mr-3 text-cyan-400 animate-spin-slow" />
              Original URL
            </h3>
            <p className="text-lg text-white/90 break-all bg-white/10 p-4 rounded-2xl font-mono font-medium">{analytics.originalUrl}</p>
          </div>
          
          {/* Click Details */}
          <div>
            <h3 className="font-bold text-white mb-8 flex items-center text-2xl">
              <BarChart3 size={24} className="mr-3 text-purple-400 animate-pulse" />
              Click Details
            </h3>
            
            {analytics.clicks.length === 0 ? (
              <div className="text-center py-16 text-white/60">
                <div className="relative">
                  <BarChart3 size={80} className="mx-auto mb-6 opacity-40 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-2xl"></div>
                </div>
                <p className="text-2xl font-bold mb-2">No clicks yet ✨</p>
                <p className="text-lg">Share your short URL to start tracking clicks</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.clicks.map((click, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-white/40">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 text-lg mb-3">
                          <span className="font-bold text-white">
                            {new Date(click.timestamp).toLocaleString()}
                          </span>
                          <span className="text-white/80 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            {click.referrer}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <div className="flex items-center space-x-1">
                            <Globe size={16} className="text-cyan-400" />
                            <span className="font-bold">{click.location}</span>
                          </div>
                          <span className="bg-white/20 px-3 py-1 rounded-full font-medium">IP: {click.ip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};