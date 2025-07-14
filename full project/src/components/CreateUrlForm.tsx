import React, { useState } from 'react';
import { ExternalLink, Clock, Hash, AlertCircle, CheckCircle } from 'lucide-react';
import { urlService } from '../services/urlService';

interface CreateUrlFormProps {
  onUrlCreated: () => void;
}

export const CreateUrlForm: React.FC<CreateUrlFormProps> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ shortLink: string; expiry: string } | null>(null);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await urlService.createShortUrl({
        url,
        validity,
        shortcode: shortcode || undefined
      });
      
      setResult(response);
      onUrlCreated();
      
      // Reset form
      setUrl('');
      setShortcode('');
      setValidity(30);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (result?.shortLink) {
      navigator.clipboard.writeText(result.shortLink);
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-white/30 transition-all duration-500">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
          <ExternalLink className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
          Create Short URL
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="url" className="block text-lg font-bold text-white mb-4">
            <ExternalLink size={20} className="inline mr-3 text-pink-400" />
            Original URL *
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500"></div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com/very-long-url"
              className="relative w-full px-6 py-5 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 transition-all duration-500 bg-white/10 backdrop-blur-xl text-white placeholder-white/50 text-lg font-medium"
          />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="validity" className="block text-lg font-bold text-white mb-4">
              <Clock size={20} className="inline mr-3 text-green-400" />
              Validity (minutes)
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500"></div>
            <input
              type="number"
              id="validity"
              value={validity}
              onChange={(e) => setValidity(Number(e.target.value))}
              min="1"
              max="10080"
                className="relative w-full px-6 py-5 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:border-green-400 transition-all duration-500 bg-white/10 backdrop-blur-xl text-white text-lg font-medium"
            />
            </div>
          </div>
          
          <div>
            <label htmlFor="shortcode" className="block text-lg font-bold text-white mb-4">
              <Hash size={20} className="inline mr-3 text-purple-400" />
              Custom Shortcode (optional)
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500"></div>
            <input
              type="text"
              id="shortcode"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
              placeholder="mycode123"
              pattern="[a-zA-Z0-9]{3,20}"
                className="relative w-full px-6 py-5 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-500 bg-white/10 backdrop-blur-xl text-white placeholder-white/50 text-lg font-medium"
            />
            </div>
            <p className="text-sm text-white/60 mt-3 font-medium">Alphanumeric, 3-20 characters</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
        <button
          type="submit"
          disabled={loading}
            className="relative w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-6 px-8 rounded-2xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-105 font-black text-xl shadow-2xl"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              <span>Creating Magic...</span>
            </div>
          ) : (
            'Create Short URL ✨'
          )}
        </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-8 p-6 bg-red-500/20 backdrop-blur-xl border border-red-400/50 rounded-2xl animate-shake shadow-2xl">
          <div className="flex items-center">
            <AlertCircle size={20} className="text-red-400 mr-3 animate-pulse" />
            <span className="text-red-200 font-bold text-lg">{error}</span>
          </div>
        </div>
      )}
      
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-2xl animate-fadeIn shadow-2xl backdrop-blur-xl">
          <div className="flex items-center mb-2">
            <CheckCircle size={24} className="text-green-400 mr-3 animate-bounce" />
            <span className="text-green-200 font-black text-2xl">Short URL Created Successfully! 🎉</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl">
              <span className="font-mono text-lg text-white flex-1 mr-4 font-bold">{result.shortLink}</span>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-xl"
              >
                Copy ✨
              </button>
            </div>
            
            <p className="text-lg text-white/80 flex items-center font-medium">
              <Clock size={18} className="mr-3 text-yellow-400" />
              Expires: <span className="font-bold ml-2 text-yellow-200">{new Date(result.expiry).toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};