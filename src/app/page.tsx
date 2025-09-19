'use client';

import { useState } from 'react';
import MainScreen from './components/MainScreen';
import GraphScreen from './components/GraphScreen';
import SettingsScreen from './components/SettingsScreen';
import NavigationBar from './components/NavigationBar';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'main' | 'graph' | 'settings'>('main');

  const handleCountChange = (_count: number) => {
    // カウント変更時の処理（必要に応じて実装）
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'main':
        return <MainScreen onCountChange={handleCountChange} />;
      case 'graph':
        return <GraphScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <MainScreen onCountChange={handleCountChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* メインコンテンツエリア */}
      <div className="pb-20">
        {renderActiveScreen()}
      </div>
      
      {/* ナビゲーションバー */}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
