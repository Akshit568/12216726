import React, { useState } from 'react';
import { CreateUrlForm } from './CreateUrlForm';
import { UrlList } from './UrlList';
import { Statistics } from './Statistics';
import { Tabs } from './Tabs';

export const UrlShortener: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'stats'>('create');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleUrlCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  const tabs = [
    { id: 'create', label: 'Create Short URL', icon: '🔗' },
    { id: 'list', label: 'URL List', icon: '📋' },
    { id: 'stats', label: 'Analytics', icon: '📊' }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="mt-8">
        {activeTab === 'create' && (
          <CreateUrlForm onUrlCreated={handleUrlCreated} />
        )}
        
        {activeTab === 'list' && (
          <UrlList refreshTrigger={refreshTrigger} />
        )}
        
        {activeTab === 'stats' && (
          <Statistics />
        )}
      </div>
    </div>
  );
};