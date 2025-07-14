import React from 'react';
import { UrlShortener } from './components/UrlShortener';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce-slow"></div>
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <UrlShortener />
      </main>
      <Footer />
    </div>
  );
}

export default App;