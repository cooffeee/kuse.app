'use client';

interface NavigationBarProps {
  activeTab: 'main' | 'graph' | 'settings';
  onTabChange: (tab: 'main' | 'graph' | 'settings') => void;
}

export default function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const tabs = [
    {
      id: 'main' as const,
      label: 'カウント',
      icon: '🏠',
      description: ''
    },
    {
      id: 'graph' as const,
      label: 'グラフ',
      icon: '📊',
      description: ''
    },
    {
      id: 'settings' as const,
      label: '設定',
      icon: '⚙️',
      description: ''
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="text-xl mb-1">
                {tab.icon}
              </div>
              <div className="text-xs font-medium">
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
