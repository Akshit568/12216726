import React, { useState, useEffect } from 'react';
import { ExternalLink, BarChart3, Calendar, MousePointer } from 'lucide-react';
import { urlService } from '../services/urlService';

interface UrlData {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiryDate: string;
  clickCount: number;
  clicks: number;
}

interface UrlListProps {
  refreshTrigger: number;
}

export const UrlList: React.FC<UrlListProps> = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  
  useEffect(() => {
    loadUrls();
  }, [refreshTrigger]);
  
  const loadUrls = async () => {
    setLoading(true);
    try {
      // Since getAllUrls endpoint doesn't exist in the spec, 
      // we'll show a message for now
      setUrls([]);
    } catch (error) {
      console.error('Failed to load URLs:', error);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewStats = (shortcode: string) => {
    setSelectedUrl(shortcode);
  };
  
  const isExpired = (expiryDate: string) => {
    return new Date() > new Date(expiryDate);
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-white/30 transition-all duration-500">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
          <ExternalLink className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          URL List
        </h2>
      </div>
      
      {urls.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <div className="relative">
            <ExternalLink size={80} className="mx-auto mb-6 opacity-40 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-2xl"></div>
          </div>
          <p className="text-3xl font-bold mb-4">No URLs created yet ✨</p>
          <p className="text-xl">Create your first short URL to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {urls.map((url) => (
            <div
              key={url.shortcode}
              className={`border-2 rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 ${
                isExpired(url.expiryDate) 
                  ? 'border-red-400/50 bg-gradient-to-r from-red-500/20 to-red-600/30 backdrop-blur-xl' 
                  : 'border-white/20 hover:border-white/40 bg-white/10 backdrop-blur-xl hover:shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <code className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl text-lg font-mono font-bold text-white">
                      {url.shortcode}
                    </code>
                    {isExpired(url.expiryDate) && (
                      <span className="text-sm bg-red-500/30 text-red-200 px-4 py-2 rounded-full font-bold animate-pulse">
                        Expired
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg text-white/90 mb-4 break-all bg-white/10 p-3 rounded-xl font-medium">
                    {url.originalUrl}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-white/70">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} className="text-blue-400" />
                      <span className="font-bold">Created: {new Date(url.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MousePointer size={16} className="text-green-400" />
                      <span className="font-bold">{url.clickCount} clicks</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleViewStats(url.shortcode)}
                  className="ml-6 flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-110 text-lg font-bold shadow-2xl"
                >
                  <BarChart3 size={20} />
                  <span>Stats ✨</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};