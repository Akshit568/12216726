import React from 'react';
import { Heart, Code, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-2xl border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-white/70">
            <span>Built with</span>
            <Heart className="text-pink-500 animate-pulse" size={16} />
            <span>using React & Express.js</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/70">
              <Code size={16} />
              <span className="text-sm">Microservice Architecture</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <Zap size={16} />
              <span className="text-sm">Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};