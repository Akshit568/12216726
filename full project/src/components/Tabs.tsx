import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 bg-white/10 backdrop-blur-2xl p-2 rounded-3xl shadow-2xl border border-white/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl shadow-pink-500/50 scale-105'
              : 'text-white/70 hover:text-white hover:bg-white/20 hover:shadow-xl'
          }`}
        >
          <span className="text-2xl animate-bounce-subtle">{tab.icon}</span>
          <span className="text-lg">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};