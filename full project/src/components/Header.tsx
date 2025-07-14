import React from 'react';
import { Link, Zap, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-2xl shadow-2xl border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                <Link className="text-white drop-shadow-lg" size={32} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Short.ly
              </h1>
              <p className="text-white/80 font-semibold text-lg">Lightning Fast URL Shortener</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Sparkles className="text-yellow-400 animate-pulse" size={20} />
              <span className="font-bold text-white">Premium</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Zap className="text-blue-400 animate-bounce" size={20} />
              <span className="font-bold text-white">Instant</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};